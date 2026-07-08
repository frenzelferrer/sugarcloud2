# Anti-Inspection Feature Documentation

## Overview

The anti-inspection feature is a comprehensive security module that prevents unauthorized access to the application's source code and internal structure through browser developer tools and other inspection methods.

## Features

The `useAntiInspection` hook implements the following protections:

### 1. **Right-Click Context Menu Disabled**
- Prevents users from right-clicking on the page
- Blocks access to the context menu that typically provides "Inspect Element" option

### 2. **Copy/Paste Disabled**
- Prevents copying content from the page using Ctrl+C or Cmd+C
- Prevents pasting content using Ctrl+V or Cmd+V
- Disables clipboard access for data exfiltration

### 3. **Drag and Drop Disabled**
- Prevents dragging elements off the page
- Blocks dropping files or content onto the page
- Disables drag-to-inspect functionality

### 4. **Keyboard Shortcuts Blocked**
The following keyboard shortcuts are disabled:

| Shortcut | Purpose | Platform |
|----------|---------|----------|
| F12 | Open Developer Tools | All |
| Ctrl+Shift+I | Open Inspector/DevTools | Windows/Linux |
| Ctrl+Shift+J | Open Console | Windows/Linux |
| Ctrl+U | View Page Source | Windows/Linux |
| Cmd+Option+I | Open Inspector/DevTools | macOS |
| Cmd+Option+J | Open Console | macOS |
| Cmd+Option+U | View Page Source | macOS |

### 5. **DevTools Detection**
- Monitors for open developer tools using multiple detection methods
- Checks for unusual window/viewport size differences
- Detects debugger statements
- Clears console and logs warnings when DevTools is detected
- Runs continuous monitoring every 1 second

### 6. **Text Selection Prevention**
- Disables text selection across the entire page using CSS
- Allows text selection only in input fields and textareas for usability
- Prevents content copying through selection

## Implementation

### File Location
- **Hook**: `client/src/hooks/useAntiInspection.ts`
- **Integration**: `client/src/App.tsx`

### How It Works

The feature is implemented as a React hook that:

1. Attaches event listeners to document and window objects
2. Prevents default behavior for protected actions
3. Injects CSS rules to disable text selection
4. Runs periodic DevTools detection
5. Cleans up all listeners and styles on component unmount

### Usage

The hook is automatically initialized in the main `App` component:

```typescript
function App() {
  // Enable anti-inspection features
  useAntiInspection();

  return (
    // ... rest of the app
  );
}
```

## Limitations

**Important**: This feature provides deterrence against casual inspection attempts but is **not a complete security solution**. Determined users with technical knowledge can still:

- Disable JavaScript in the browser
- Use browser extensions to bypass restrictions
- Inspect network traffic using proxy tools
- Access the application through browser console manipulation
- Use headless browser tools

## Best Practices

To maximize security:

1. **Combine with Backend Security**: Never rely solely on client-side protection for sensitive data
2. **Obfuscation**: Consider using JavaScript obfuscation tools for production builds
3. **Content Security Policy**: Implement CSP headers to prevent injection attacks
4. **API Security**: Ensure all sensitive operations are protected by server-side authentication and authorization
5. **Monitoring**: Log and monitor suspicious access patterns

## Troubleshooting

### Users Cannot Select Text
This is intentional. If you need to allow text selection in specific areas:

1. Add a class to those elements
2. Modify the CSS in `useAntiInspection.ts` to allow selection for that class

### Keyboard Shortcuts Still Work
If shortcuts are still accessible:
- Ensure the hook is properly imported and called in `App.tsx`
- Check browser console for JavaScript errors
- Verify that no other code is interfering with event listeners

### DevTools Detection Not Working
- Some browsers may have different detection methods
- The detection is probabilistic and may not catch all cases
- Consider adding additional detection methods if needed

## Future Enhancements

Potential improvements to the anti-inspection system:

- [ ] Add more sophisticated DevTools detection methods
- [ ] Implement iframe-based content isolation
- [ ] Add WebWorker-based monitoring
- [ ] Implement code obfuscation integration
- [ ] Add analytics for inspection attempts
- [ ] Support for custom warning messages
- [ ] Configurable protection levels

## References

- [MDN: Preventing Text Selection](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)
- [MDN: Keyboard Events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
