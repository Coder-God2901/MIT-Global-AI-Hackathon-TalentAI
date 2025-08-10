# TalentAI Navigation System

This document describes the navigation components and utilities available in the TalentAI platform for consistent and intuitive user experience.

## Overview

The navigation system provides:
- **Back Button**: Intuitive navigation to previous pages
- **Dashboard Link**: Quick access to user's dashboard
- **Navigation Header**: Comprehensive header with consistent branding and controls
- **Breadcrumb Navigation**: Contextual navigation paths
- **Navigation Utils**: Smart routing logic and context management

## Components

### 1. BackButton Components

#### `BackButton`
Basic back button with icon only.

```tsx
import { BackButton } from './BackButton';

<BackButton
  onClick={() => navigate('previous-page')}
  label="Go back"
  variant="ghost"
  size="sm"
/>
```

#### `BackButtonWithText`
Back button with optional text label that shows on desktop.

```tsx
import { BackButtonWithText } from './BackButton';

<BackButtonWithText
  onClick={() => navigate('previous-page')}
  label="Back"
  showTextOnDesktop={true}
/>
```

### 2. Dashboard Link Components

#### `DashboardLink`
Basic dashboard navigation link.

```tsx
import { DashboardLink } from './DashboardLink';

<DashboardLink
  onClick={() => navigate('candidate-dashboard')}
  userType="candidate"
  showIcon={true}
  showText={true}
/>
```

#### `ResponsiveDashboardLink`
Dashboard link that adapts to screen size.

```tsx
import { ResponsiveDashboardLink } from './DashboardLink';

<ResponsiveDashboardLink
  onClick={() => navigate('candidate-dashboard')}
  userType="candidate"
/>
```

#### `HomeButton`
Simple home navigation button.

```tsx
import { HomeButton } from './DashboardLink';

<HomeButton
  onClick={() => navigate('landing')}
  label="Home"
/>
```

### 3. Navigation Header

#### `NavigationHeader`
Comprehensive header with all navigation elements.

```tsx
import { NavigationHeader } from './NavigationHeader';

<NavigationHeader
  currentView="skill-challenge"
  userType={user?.type}
  onNavigate={navigate}
  title="Skill Challenge"
  subtitle="Test your coding skills"
  actions={
    <Button>Custom Action</Button>
  }
/>
```

#### `SimpleNavigationHeader`
Minimal navigation header for specific use cases.

```tsx
import { SimpleNavigationHeader } from './NavigationHeader';

<SimpleNavigationHeader
  currentView="profile"
  userType={user?.type}
  onNavigate={navigate}
/>
```

#### `BreadcrumbNavigation`
Breadcrumb-style navigation.

```tsx
import { BreadcrumbNavigation } from './NavigationHeader';

<BreadcrumbNavigation
  currentView="profile"
  userType={user?.type}
  onNavigate={navigate}
/>
```

## Navigation Flow Mapping

The navigation system automatically determines the correct navigation flow based on the current view and user type:

### Back Button Destinations
- `signup` → `landing`
- `skill-challenge` → `candidate-dashboard`
- `interview-experience` → `candidate-dashboard`
- `job-search` → `candidate-dashboard`
- `profile` → `{user-type}-dashboard`

### Dashboard Destinations
- `candidate` → `candidate-dashboard`
- `recruiter` → `recruiter-dashboard`

## Usage Guidelines

### 1. Page Integration

Each page should include navigation using one of these patterns:

#### Option A: Use NavigationHeader (Recommended)
```tsx
export default function MyPage({ onNavigate, user }: ComponentProps) {
  return (
    <div className="min-h-screen bg-talentai-background">
      <NavigationHeader
        currentView="my-page"
        userType={user?.type}
        onNavigate={onNavigate!}
        title="Page Title"
        subtitle="Page description"
      />
      {/* Page content */}
    </div>
  );
}
```

#### Option B: Use Individual Components
```tsx
export default function MyPage({ onNavigate, user }: ComponentProps) {
  const navContext = getNavigationContext('my-page', user?.type);
  
  return (
    <div className="min-h-screen bg-talentai-background">
      <header className="flex items-center justify-between p-4">
        {navContext.showBackButton && (
          <BackButtonWithText
            onClick={() => onNavigate(navContext.backDestination!)}
            label="Back"
          />
        )}
        
        {navContext.showDashboardLink && (
          <ResponsiveDashboardLink
            onClick={() => onNavigate(navContext.dashboardDestination!)}
            userType={user?.type}
          />
        )}
      </header>
      {/* Page content */}
    </div>
  );
}
```

### 2. Responsive Behavior

All navigation components are responsive by default:

- **Mobile**: Icons only with tooltips
- **Tablet**: Icons with some text labels
- **Desktop**: Full text labels with icons

### 3. Accessibility Features

All navigation components include:
- **ARIA labels**: Screen reader friendly
- **Keyboard navigation**: Tab and Enter support
- **Focus indicators**: Clear focus states
- **Tooltips**: Helpful hover information

## Navigation Utils

### `getNavigationContext()`
Returns navigation context for a given view and user type.

```tsx
import { getNavigationContext } from '../utils/navigation';

const navContext = getNavigationContext('skill-challenge', 'candidate');
// Returns:
// {
//   showBackButton: true,
//   showDashboardLink: false,
//   backDestination: 'candidate-dashboard',
//   dashboardDestination: 'candidate-dashboard',
//   breadcrumbs: [...]
// }
```

### `getBackDestination()`
Get the appropriate back destination for a view.

```tsx
import { getBackDestination } from '../utils/navigation';

const backView = getBackDestination('profile', 'candidate');
// Returns: 'candidate-dashboard'
```

### `getDashboardDestination()`
Get the dashboard destination for a user type.

```tsx
import { getDashboardDestination } from '../utils/navigation';

const dashboardView = getDashboardDestination('candidate');
// Returns: 'candidate-dashboard'
```

## Styling

### Colors
Navigation components use TalentAI's design system:
- **Primary**: `text-talentai-accent` (#441752)
- **Hover**: `hover:text-talentai-accent/80`
- **Background**: `hover:bg-talentai-accent/10`

### Focus States
All interactive elements include focus states:
- **Ring**: `focus:ring-2 focus:ring-talentai-accent/50`
- **Offset**: `focus:ring-offset-2`

## Best Practices

### 1. Consistent Placement
- Always place navigation at the top of the page
- Use consistent spacing and alignment
- Maintain the same visual hierarchy

### 2. User Experience
- Provide clear visual feedback for interactive elements
- Use consistent labeling across the platform
- Ensure touch targets are appropriately sized (minimum 44px)

### 3. Performance
- Navigation components are lightweight and optimized
- Lazy load icons when possible
- Use appropriate HTML semantic elements

### 4. Testing
- Test navigation flow across all user types
- Verify keyboard accessibility
- Test on all supported breakpoints
- Validate ARIA labels with screen readers

## Examples

### Complete Page Implementation
```tsx
import React from 'react';
import { NavigationHeader } from './NavigationHeader';
import type { ComponentProps } from '../types';

export default function ExamplePage({ onNavigate, user }: ComponentProps) {
  return (
    <div className="min-h-screen bg-talentai-background">
      <NavigationHeader
        currentView="example-page"
        userType={user?.type}
        onNavigate={onNavigate!}
        title="Example Page"
        subtitle="This is an example implementation"
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Action 1</Button>
            <Button size="sm">Action 2</Button>
          </div>
        }
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page content goes here */}
      </div>
    </div>
  );
}
```

This navigation system ensures consistent user experience across the TalentAI platform while maintaining accessibility and responsive design principles.