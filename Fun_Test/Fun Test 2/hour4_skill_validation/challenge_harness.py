# challenge_harness.py
"""
Runs the candidate's submitted code by writing it to a temp file,
then executing a small test runner in a subprocess with a timeout.
Returns a dict with {passed, total, score, runtime}.
WARNING: This is a basic sandbox intended for local testing. Do NOT expose on untrusted public servers.
"""

import tempfile
import subprocess
import time
import os
import json
import sys
import textwrap

# The test runner will import the user script and call a function `build_model()` that should return a fitted sklearn estimator.
# We'll run quick smoke tests: does it predict expected classes on a small test set.

TEST_RUNNER = r"""
import json, sys, traceback
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

try:
    # import user module
    import user_submission as us
    if not hasattr(us, 'build_model'):
        print(json.dumps({'error': 'No function build_model() in submission'}))
        sys.exit(0)

    model = us.build_model()
    # quick synthetic test
    X, y = make_classification(n_samples=200, n_features=6, n_informative=4, n_redundant=0, random_state=42)
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1, test_size=0.2)
    try:
        preds = model.predict(X_test)
    except Exception as e:
        print(json.dumps({'error': 'Model predict failed: ' + str(e)}))
        sys.exit(0)

    acc = float(accuracy_score(y_test, preds))
    passed = 1 if acc >= 0.6 else 0
    total = 1
    print(json.dumps({'passed': passed, 'total': total, 'accuracy': acc}))
except Exception as e:
    print(json.dumps({'error': str(e), 'trace': traceback.format_exc()}))
    sys.exit(0)
"""

def run_user_code_against_tests(user_code: str, timeout_seconds: int = 5):
    # create a temporary directory
    with tempfile.TemporaryDirectory() as d:
        user_path = os.path.join(d, 'user_submission.py')
        runner_path = os.path.join(d, 'runner.py')
        # write user code
        with open(user_path, 'w') as f:
            f.write(user_code)
        # write runner
        with open(runner_path, 'w') as f:
            f.write(TEST_RUNNER)

        # run runner using subprocess
        start = time.time()
        try:
            proc = subprocess.run([sys.executable, runner_path],
                                  cwd=d,
                                  capture_output=True,
                                  text=True,
                                  timeout=timeout_seconds)
        except subprocess.TimeoutExpired:
            return {'passed': 0, 'total': 1, 'score': 0.0, 'error': 'timeout'}

        runtime = time.time() - start
        out = proc.stdout.strip()
        err = proc.stderr.strip()
        if not out:
            # something went wrong
            return {'passed': 0, 'total': 1, 'score': 0.0, 'error': 'no output', 'stderr': err}

        try:
            parsed = json.loads(out)
        except Exception as e:
            return {'passed': 0, 'total': 1, 'score': 0.0, 'error': 'invalid json from test runner', 'stdout': out, 'stderr': err}

        if 'error' in parsed:
            return {'passed': 0, 'total': parsed.get('total',1), 'score': 0.0, 'error': parsed['error'], 'trace': parsed.get('trace','')}

        passed = int(parsed.get('passed',0))
        total = int(parsed.get('total',1))
        accuracy = float(parsed.get('accuracy', 0.0))
        score = round((passed/total)*100, 2)
        return {'passed': passed, 'total': total, 'score': score, 'accuracy': accuracy, 'runtime': runtime}
