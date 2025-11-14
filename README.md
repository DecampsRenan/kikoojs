# KikooJS
[![Netlify Status](https://api.netlify.com/api/v1/badges/39933494-361b-42f0-83a8-c9f33c6b3bba/deploy-status)](https://app.netlify.com/projects/kikoojs/deploys)

> You never asked for it, now it’s real. All the fun libs in one package.

## Getting started

```sh
npm install kikoojs # yes, simple 😄
```

## What do you get ?

I strongly recommend to check the [demo website](https://kikoojs.netlify.app).

**Includes**:

- 🛗 [ElevatorJS](https://github.com/tholman/elevator.js)
- 🥚 [Easter Egg Collection](https://github.com/WeiChiaChang/easter-egg-collection)
- ↖ [90's cursor effects](https://github.com/tholman/cursor-effects)
- 📀 DVD Screensaver effect
- ✨ [Power Glitch Effect](https://github.com/7PH/powerglitch)

### `useElevator()`

```tsx
const MyPage = () => {
  const [triggerRef] = useElevator<HTMLButtonElement>({
    mainAudio: "/sfx/waiting.mp3",
		endAudio: "/sfx/ding.mp3",
  });

  return (
    <div>
      {/* veryyyyyyyyy lonnnnnnnnnng bodyyyyyyyy */}
      <button ref={triggerRef} type="button">Back to top ⬆️</button>
    </div>
  )
}
```

### `import from 'easter-egg-collections/register'`

### `useCursor()`

### `useDvd()`

### `useGlitch()`

### Utilities

## Development

- Install dependencies:

```bash
pnpm install
```

- Run build in watch mode:

```bash
pnpm dev
```

- Run the playground:

```bash
pnpm play
```

- Build the library:

```bash
pnpm build
```
