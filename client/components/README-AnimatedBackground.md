# Animated Background Component

An interactive WebGL/Canvas-based background component that creates flowing iridescent particles with mouse interaction support.

## Features

- **Iridescent Particle System**: Flowing particles with color-shifting effects
- **Mouse/Touch Interaction**: Particles react to cursor position and movement
- **Performance Optimized**: Adaptive particle count based on screen size
- **Accessibility Support**: Respects `prefers-reduced-motion` with static fallback
- **Responsive**: Automatically adapts to screen size changes

## Usage

```tsx
import AnimatedBackground from '@/components/AnimatedBackground';

// Basic usage with default settings
<AnimatedBackground />

// Customized settings
<AnimatedBackground
  tint={[0.5, 0.6, 0.8]}
  speed={1.0}
  mouse={true}
/>
```

## Props

| Prop    | Type                       | Default           | Description                                      |
| ------- | -------------------------- | ----------------- | ------------------------------------------------ |
| `tint`  | `[number, number, number]` | `[0.5, 0.6, 0.8]` | RGB color multipliers (0-1) for particle tinting |
| `speed` | `number`                   | `1.0`             | Animation playback speed multiplier              |
| `mouse` | `boolean`                  | `true`            | Enable/disable mouse interaction                 |

## Color Tint System

The `tint` prop accepts three values representing RGB multipliers:

- `[0.5, 0.6, 0.8]` - Blue-purple iridescence (default)
- `[0.8, 0.4, 0.6]` - Pink-red warmth
- `[0.4, 0.8, 0.5]` - Green-cyan coolness

## Performance & Accessibility

### Automatic Optimizations

- Particle count scales with screen size (max 120 particles)
- High DPI display support with automatic scaling
- Efficient animation loop with requestAnimationFrame

### Reduced Motion Support

When `prefers-reduced-motion: reduce` is detected:

- Disables all animations and interactions
- Shows static gradient fallback using the same color tint
- Maintains visual consistency without motion

### Manual Disable Options

#### Option 1: Disable mouse interaction

```tsx
<AnimatedBackground mouse={false} />
```

#### Option 2: Reduce speed

```tsx
<AnimatedBackground speed={0.3} />
```

#### Option 3: Check for reduced motion in parent component

```tsx
const [reducedMotion, setReducedMotion] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  setReducedMotion(mediaQuery.matches);
}, []);

return (
  <div>
    {!reducedMotion && <AnimatedBackground />}
    <main className="relative z-10">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </main>
  </div>
);
```

## Implementation Details

### Canvas Rendering

- Uses HTML5 Canvas with 2D context for broad compatibility
- High DPI support with automatic pixel ratio scaling
- Efficient particle management with object pooling

### Particle System

- Each particle has: position, velocity, life cycle, hue, size
- Particles wrap around screen edges for seamless effect
- Connection lines drawn between nearby particles

### Mouse Interaction

- Attraction force applied to particles within 150px of cursor
- Touch events supported for mobile devices
- Debounced interaction to prevent performance issues

## Browser Support

- **Modern Browsers**: Full feature support (Chrome, Firefox, Safari, Edge)
- **Older Browsers**: Graceful degradation to static gradient
- **Mobile Devices**: Touch interaction supported

## Integration Example

```tsx
// In your main layout component
import AnimatedBackground from "@/components/AnimatedBackground";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground tint={[0.5, 0.6, 0.8]} speed={1.0} mouse={true} />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
```

## Troubleshooting

### Performance Issues

- Reduce particle count by modifying the calculation in `initParticles`
- Lower the speed value: `speed={0.5}`
- Disable mouse interaction: `mouse={false}`

### Visual Issues

- Ensure the component is positioned with `position: fixed` and `z-index: -1`
- Check that parent container has `position: relative`
- Verify content has higher z-index values

### Accessibility

- Component automatically respects `prefers-reduced-motion`
- Uses `pointer-events: none` to ensure underlying content remains interactive
- Provides static gradient fallback for reduced motion users
