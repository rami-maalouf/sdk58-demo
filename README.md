# Expo SDK 58 demo

An app that shows what is new in Expo SDK 58, on iOS and Android. It is built for foldables: the iPhone Duo and Android foldables such as the Pixel Fold. It is the demo app of the "What's new in Expo SDK 58" video.

Each demo shows its label from the [SDK 58 changelog](https://expo.dev/changelog/sdk-58) (Stable, New, Beta, Alpha, or Experimental) and links to its section. Tap the info button on a demo screen to see them.

## What is in it

| Tab      | Demo               | SDK 58 feature                                        | Label        | Platforms    |
| -------- | ------------------ | ----------------------------------------------------- | ------------ | ------------ |
| Mail     | Mail               | Expo UI `NavigationSplitView` on iOS                  | New          | iOS, Android |
| Mail     | App Intents        | `expo-app-intents`: Siri and Shortcuts create a draft | Alpha        | iOS          |
| Home     | Inbox widget       | `expo-widgets` home screen widgets on Android         | New          | Android, iOS |
| Duo/Fold | Hinge              | `expo-hinge`, and `ArrangementView` on iOS            | New          | iOS, Android |
| More     | Compose components | Expo UI `DateRangePicker` and `VerticalSlider`        | New          | Android      |
| More     | Variable fonts     | `expo-font` variable fonts                            | New          | iOS, Android |
| More     | SVG variables      | `expo-image` `svgVariables`                           | New          | iOS, Android |
| More     | Native race        | Expo Modules 2.0: `@JS` against the module DSL        | Beta         | iOS, Android |
| More     | Heavy screen       | Expo Router navigation in a React transition          | Experimental | iOS, Android |
| More     | Data loaders       | Expo Router data loaders                              | Stable       | iOS, Android, web |
| All      | Tabs and toolbars  | Expo Router native tabs and `Stack.Toolbar`           | Stable       | iOS, Android |

On Android, the tabs are Mail, Fold, Timer, and More, and the screens use Jetpack Compose through Expo UI.

### Mail

A three-column mail client built with Expo UI's `NavigationSplitView`: mailboxes, messages, and the open message. On the unfolded Duo (or an iPad), the columns are side by side. On the folded Duo (or an iPhone), they become a stack. Fold or unfold the Duo, and the open message stays open. Swipe a message to archive, flag, or delete it, and tap Reply to start a draft.

`NavigationSplitView` is SwiftUI only. On Android, the Mail tab is a Material 3 inbox with Expo UI's Jetpack Compose components and the same mail data. On an unfolded foldable, the open message sits beside the list.

### App Intents

Siri, Spotlight, Shortcuts, or Apple Intelligence can write a draft, and it opens in Drafts in the Mail tab. The intents are Swift files in `app-intents/`, which `npx expo-app-intents init --examples mail --visual-intelligence` created:

- `NewDraftIntent` is a plain intent with the phrase "New draft in SDK 58". Siri asks one question, "Who is it for, and what should it say?", and you answer in one sentence: "Tell Maya the split view works and ask her to film the fold tomorrow". Apple's on-device model (Foundation Models, iOS 26 and later, with Apple Intelligence on) turns it into the recipient, a subject, and a short body (`app-intents/DraftWriter.swift`). Then the app opens on the finished draft (`supportedModes` is `.foreground(.deferred)`, and `perform()` calls `continueInForeground()`). Without the model, your sentence becomes the body. It also shows in Spotlight: search for "SDK 58" and tap "New Draft".
- `CreateDraftIntent` adopts Apple's `.mail.createDraft` schema, so Apple Intelligence and Siri can find it without a phrase. In our tests on iOS 27, a request such as "email Maya ..." opened Apple's Mail app instead, so the phrase intent above is the one to use.
- The Mail tab publishes its drafts as the `mailDraft` entity catalog (`setEntityCatalogAsync`). Siri resolves a draft you name from it, and `AppIntentsSetup.swift` mirrors it into Spotlight: search for a draft's subject and tap it, and `OpenMailDraftIntent` (the `.mail.openDraft` schema, iOS 27) opens it.
- An open draft carries `appEntityIdentifier('mailDraft', id)`, so Siri with Apple Intelligence knows which draft is on screen (on-screen intelligence, iOS 18.4 and later, built with Xcode 27).

The intents send `createMailDraft` and `openMailDraft` invocations to JavaScript. `src/demos/mail/use-draft-intents.ts` handles them with `useAppIntents()`, including invocations that arrive while the app is closed.

### Inbox widget

A home screen widget with the unread mail from the Mail tab, written in React with `expo-widgets`. Home screen widgets are new on Android in SDK 58. The same widget has an iOS layout too.

- `src/demos/inbox-widget/inbox-widget.android.tsx` uses Expo UI's Jetpack Compose components, which `expo-widgets` draws with Glance. Its colors come from the wallpaper's Material You palette (`getMaterialColors()`).
- `src/demos/inbox-widget/inbox-widget.tsx` is the iOS layout, with SwiftUI components.
- `app.json` declares the widget for both platforms. On Android, the config plugin needs `"enableAndroid": true`.

The app sends every inbox change to the widget with `updateSnapshot()`, so reading a message in the app updates the count. The widget's "Mark all read" button returns the widget's new props, so it works without the app on screen, and the app mirrors it with `addUserInteractionListener()`.

To add it on Android: long-press the home screen, tap Widgets, and find SDK 58. On iOS: long-press the home screen, tap Edit, then Add Widget, and find SDK 58.

### Hinge

The live hinge angle and status from `expo-hinge`, and the lowest and highest angle of the session. Open the Duo, and Expo UI's `ArrangementView` splits the screen into two panels. The picker switches the arrangement between adaptive, side by side, and stacked. On a device without a hinge, the tab says that it needs an iPhone Duo.

On Android, the Fold tab shows the same readings in Material 3, side by side when the device is unfolded. Android reports the hinge only while the app's window spans the fold, and never reports "closed".

### Compose components

Three Jetpack Compose components that are new in Expo UI, each in a small real use:

- `DateRangePicker`: pick your days off. The title shows the range and the number of days.
- `DateRangePickerDialog`: the same picker in a dialog. A range saved in the dialog moves the inline picker too.
- `VerticalSlider`: four volume sliders, like the Android volume panel. They only move: they do not set a volume.

Fold or unfold the device, and the range and the sliders stay where they were.

### Variable fonts

One Roboto Flex file, loaded with `useFonts`, gives nine weights and their italics. React Native 0.88's `fontVariationSettings` sets the weight and slant axes, and a slider moves the weight from 100 to 1000 live. The slider is a universal Expo UI component: SwiftUI on iOS, Jetpack Compose on Android.

On iOS, `fontWeight: '100'` and `'200'` do not pick the Thin and ExtraLight instances of this font: React Native maps 100 to Apple's UltraLight and 200 to Apple's Thin, so 200 renders as the Thin instance. `fontVariationSettings` sets the axis value itself, so every weight is correct.

Roboto Flex is © The Roboto Flex Project Authors, under the SIL Open Font License 1.1 (`src/demos/variable-fonts/OFL.txt`).

### SVG variables

One SVG file of a house, drawn by `expo-image` on iOS and Android. The SVG reads its colors from CSS variables (`var(--roof, #888888)`), and the `svgVariables` prop fills them in, so the picker recolors the roof and the image stays a vector.

### Native race

The local module in `modules/native-race` has the same Swift function twice: once in the module definition DSL, and once as a plain method marked `@JS`, which Expo Modules 2.0 binds at build time.

```swift
// The old way: describe the function inside the definition DSL.
Function("addNumbers") { (a: Double, b: Double) in
  return a + b
}

// The new way: an ordinary Swift method, exposed to JavaScript with @JS.
@JS
private func addNumbersSynthesized(a: Double, b: Double) throws -> Double {
  return a + b
}
```

Tap "Run the race" to call each one 100,000 times. The screen shows both times, how many times faster `@JS` is, and where it measured. Run a release build for fair numbers:

```bash
bunx expo run:ios --configuration Release
```

On Android, the race has three runners, because the SDK 58 changelog also measures React Native's TurboModules on Android:

- `NativeRaceModule.kt`: the same function in the Kotlin module DSL.
- `NativeRaceV2Module.kt`: a plain Kotlin method marked `@JS`. Kotlin modules 2.0 extend a different `Module` class, so this one is its own module. `v2 true` in `android/build.gradle` turns on the Expo Modules 2.0 compiler plugin.
- `modules/native-race-turbo`: a TurboModule with a codegen spec (`src/NativeRaceTurbo.ts`). Expo autolinking finds it in `modules/` and links it like a library from npm, so the generated `android/` folder needs no changes.

```kotlin
// The new way: an ordinary Kotlin method, exposed to JavaScript with @JS.
@ExpoModule("NativeRaceV2")
class NativeRaceV2Module : Module() {
  @JS
  fun addNumbers(a: Double, b: Double): Double = a + b
}
```

```bash
bunx expo run:android --variant release
```

### Heavy screen

The demo opens a screen with 1,000 tiles. Each tile waits 2 ms in render on purpose, so the screen takes about 2 seconds to render. Tap the counter while the screen opens:

- With "Use a transition" off, the push renders synchronously. JavaScript is blocked, and the taps count only after the screen opens.
- With the switch on, the push calls `router.push(href, { inTransition: true })`. React renders the screen in the background and stops for each tap, so the counter goes up at once. The spinner shows `unstable_useIsNavigating()`. Each tap restarts the render, so the screen opens later.

### Data loaders

`src/app/more/loaders.tsx` exports a `loader` that fetches five posts from [JSONPlaceholder](https://jsonplaceholder.typicode.com), and the screen reads them with `useLoaderData`. The loader does not go into the app bundle. In the app, the More list opens it. On web, the More tab links to it.

The app uses server output (`"web": { "output": "server" }`), so the loader runs on the server on each request, at `/_expo/loaders/more/loaders`. In development, `bun start` is that server. While the app waits for the data, the More stack shows a spinner (the `SuspenseFallback` export of `src/app/more/_layout.tsx`).

A release build needs a deployed server: `bunx expo export -p web`, then `bunx eas-cli deploy --prod`. Set its URL as the `origin` option of the `expo-router` plugin (not set in this repo).

### Faster Android builds

In SDK 58, `expo-modules-core` ships its C++ libraries prebuilt for Android, so a clean build does not compile them. This script times a clean debug build for all four ABIs, with the prebuilt libraries or compiled from source:

```bash
bun run android:build-time                 # prebuilt expo-modules-core
bun run android:build-time --from-source   # compiled from source, as before SDK 58
```

Our numbers, on an Apple M5 Pro (18 cores) on October 13, 2026:

| Build                                               | Prebuilt     | From source  |
| --------------------------------------------------- | ------------ | ------------ |
| `expo-modules-core` alone, its native (CMake) tasks | 13.2 s       | 22.2 s       |
| `expo-modules-core` alone, wall time                | 20 s         | 29 s         |
| The whole app, clean, two runs each                 | 150 s, 147 s | 159 s, 140 s |

The prebuilt libraries remove about 9 s of native build time from `expo-modules-core`. In a clean build of the whole app, 18 cores compile other modules at the same time and hide the saving. The changelog measured a blank project on a 12-core M3 Pro (about 80 s down to 39 s), and says the saving is larger on machines with fewer cores, such as CI runners.

## Run it

This app uses a development build, not Expo Go. iOS needs Xcode 27. Android needs the Android SDK and JDK 17. If Gradle says "SDK location not found" or "Unable to locate a Java Runtime", set `ANDROID_HOME` and `JAVA_HOME`, for example:

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME="$(brew --prefix openjdk@17)/libexec/openjdk.jdk/Contents/Home"
```

```bash
bun install
bun run ios       # or: bun run android
```

After the first native build, `bun start` starts Metro for the installed app.

To hide the dev menu button on every launch, for example while you film, start Metro with `EXPO_NO_DEV_MENU=1 bun start`.

### iPhone Duo

The iPhone Duo simulator and `expo-hinge` need Xcode 27.1 and the iOS 27.1 simulator runtime. If Xcode 27.0 is your default Xcode, build with Xcode 27.1 for this project only:

```bash
DEVELOPER_DIR=/Applications/Xcode-27.1.app/Contents/Developer bunx expo run:ios -d "iPhone Duo"
```

Install the runtime with `xcodebuild -downloadPlatform iOS -buildVersion 27.1`. Without `-buildVersion`, Xcode 27.1 downloads the iOS 27.0 runtime.

To fold and unfold the Duo simulator from the terminal:

```bash
bun run duo fold     # 0°: the cover screen
bun run duo half     # 90°
bun run duo unfold   # 180°: the inner screen
bun run duo 135      # any angle from 0 to 180
```

Xcode 27.1's Device Hub app has the same control.

### Android foldables

Any Android emulator runs the app. For the Fold tab, create a foldable emulator, such as a Pixel 9 Pro Fold on Android 16 (API 36), in Android Studio's Device Manager or with `avdmanager`. To fold, unfold, and set the hinge angle from the terminal:

```bash
adb emu fold
adb emu unfold
adb emu sensor set hinge-angle0 90
```

### Watch the simulator in the browser

The app includes [Expo Device Hub](https://github.com/expo/expo-device-hub), an Expo DevTools plugin. When `bun start` runs, it prints a link to a dashboard that streams the simulator, and you can tap and type in it:

```
› Expo Device Hub: http://localhost:8081/_expo/plugins/expo-device-hub
```

## How the code is organized

- `src/app/`: the routes. `index.tsx` is the Mail tab, `duo/` is the Duo tab, `timer.tsx` is the Timer tab, and `more/` is the More tab.
- `src/demos/<slug>/`: one folder per demo, with all of its code.
- `src/demos/registry.ts`: one line per demo, with its title, changelog label, and changelog section.
- `modules/`: the local native modules of the native race.
- `app-intents/`: the App Intents, in Swift.

To remove a demo, delete its folder and its line in the registry.

## Credits

Most demo code is copied from code that already runs on SDK 58, and each copied file names its source:

- [expo-ui-examples](https://github.com/SchroederNathan/expo-ui-examples) by Nathan Schroeder (MIT)
- [native-component-list](https://github.com/expo/expo/tree/main/apps/native-component-list), Expo's own test app (MIT)

## Checks

```bash
bun run check              # typecheck and lint, zero warnings
bunx expo install --check  # SDK-compatible dependency versions
bunx expo-doctor@latest
bun run export             # production bundles for iOS and Android, and the web server with the loaders
```

## Changes to the template

- The welcome screens, the web files, and their assets are removed. The app runs on iOS and Android. The web platform is back for the data loaders demo. Web hides the Mail and Duo tabs (`hidden` in `src/components/app-tabs.tsx`), and the web More tab lists only the loaders demo. The server loads every route for web, so the native-only routes have a `.web.tsx` file. Web opens the first visible tab (Timer) for the Mail and Duo routes, and `/more/<slug>` redirects to More.
- `src/types/expo.d.ts` references `expo/types`, so the app type-checks before Metro generates `expo-env.d.ts`.
- ESLint is on version 9. `expo install eslint` picks ESLint 10, and `eslint-plugin-react` crashes on it (`contextOrFilename.getFilename is not a function`).
- `expo-dev-client` is installed, and `bun run ios` makes a development build.

## Upgrade to a newer SDK 58 release

These steps moved the app from `expo` 58.0.9 (React Native 0.88.0-rc.4) to `expo` 58.0.11 (React Native 0.88.0) on October 15, 2026, the day SDK 58 was released.

1. Update every package to the versions of the new `expo`:

   ```bash
   npx expo install expo@^58.0.0 --fix
   ```

2. Check the versions again. If `react-native` is still a release candidate, install the version that `expo` lists in its `bundledNativeModules.json`:

   ```bash
   npx expo install --check
   EXPO_OFFLINE=1 npx expo install --fix
   ```

   On October 15, Expo's versions API still listed React Native 0.88.0-rc.4 for SDK 58, while `expo` 58.0.11 expects 0.88.0. So the online check flags 0.88.0. Do not run the online `--fix` again until the API lists 0.88.0, or it moves React Native back to the release candidate.

3. Keep `expo-widgets` on 58.0.16. Versions 58.0.17 and 58.0.18 do not run on Android: their new custom notifications import `io.github.jakex7.peek`, but the published library is `io.github.expo.peek`, so the Kotlin build fails. With the imports fixed, the app stops at launch with `IllegalArgumentException: constructor cannot be null`, because the new `CustomNotification` class has no constructor. `package.json` pins the version and tells `expo install` to skip it:

   ```json
   "expo-widgets": "58.0.16",
   ...
   "expo": { "install": { "exclude": ["expo-widgets"] } }
   ```

   Remove both when a fixed version is published.

4. Run the checks:

   ```bash
   bun run check
   npx expo-doctor@latest
   ```

   If `expo-doctor` finds duplicate copies of a module at the same version, delete `node_modules` and run `bun install`. Its schema check reports that it "cannot access" `./assets/expo.icon`. That file is the template's Icon Composer bundle, a folder, and the app builds with it.

5. Regenerate the native projects, then build:

   ```bash
   npx expo prebuild --clean
   DEVELOPER_DIR=/Applications/Xcode-27.1.app/Contents/Developer bunx expo run:ios -d "iPhone Duo"
   bun run android
   ```

6. Open the Duo tab at 0°, 90°, and 180° (`bun run duo fold`, `half`, `unfold`) and check that the angle and the split appear. If `bun run duo` reports an angle but the screen does not change, stop the old helper with `node node_modules/expo-device-hub/vendor/serve-sim/dist/serve-sim.js --kill` and run it again: a helper started before the simulator last booted no longer reaches it.

## Precompiled modules on iOS

SDK 58 links Expo modules on iOS as precompiled XCFrameworks by default, and this app keeps that default for every module except two. `package.json` builds them from source:

```json
"expo": {
  "autolinking": {
    "ios": {
      "buildFromSource": ["@expo/ui", "expo-hinge"]
    }
  }
}
```

The iPhone Duo code in these two modules compiles only with the iOS 27.1 SDK (`#if canImport(UIKit, _version: 9127.0.85)` in `expo-hinge`, and `#if canImport(SwiftUICore, _version: 8.0.85)` around `ArrangementView` in `@expo/ui`). The precompiled frameworks leave it out: the Hinge tab shows the status, but no angle and no `ArrangementView` split. Built from source with Xcode 27.1, both work.

Checked on the iPhone Duo simulator with `@expo/ui` 58.0.16 (October 13) and again with `@expo/ui` 58.0.18 (October 15). The 58.0.18 framework contains the `ArrangementView` names, but on the Duo the angle panel and the split still do not appear. With both modules built from source, they do. `expo-hinge` is still 58.0.1.

Before `expo-modules-core` 58.0.17, precompiled modules also stopped the app at launch with Xcode 27 (`Symbol not found: _swift_allocateMetadataPack`). `expo` 58.0.9 brings the fixed version.
