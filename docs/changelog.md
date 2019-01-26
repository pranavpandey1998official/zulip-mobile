# Version History

The date on a release generally reflects when the source commit was
tagged and the release build was first posted to GitHub or our alpha
channels on the Play Store and Apple's App Store.  The main rollout
to users in general on the app stores is typically a few days later.


## Unreleased


## 22.0.107 (2019-01-09)

### Highlights for users

Many fixes and improvements, including:
* Fixed bug: a successfully-sent message would stick around as a
  zombie, with "sending" animation.
* Evaded bug in React Native: the message list and nav bar sometimes
  failed to display.
* Redesigned language-settings screen uses each language's own name,
  drops flag images, and has search.
* Translation updates in Korean, Hindi, Ukrainian, and Chinese.


### Full changes for users

* Fixed bug: a successfully-sent message would stick around as a
  zombie, with "sending" animation. (#3203)
* Evaded bug in React Native: the message list and nav bar sometimes
  failed to display. (#3089)
* Redesigned language-settings screen uses each language's own name,
  drops flag images, and has search. (#2611, #3231)
* Don't (attempt to) stop notifications on switching accounts.
  (23e01e850)
* Fix broken layout on account details screen. (#3228)
* Paint "safe area" with appropriate background color. (#3236)
* Translation updates in Korean, Hindi, Ukrainian, and Chinese.
  (7cc9950c6, 6b4ce281c)
* Keep presence info up to date. (#3207)


### Changes for developers

#### Highlights of important updates to know

All active developers will benefit from knowing about these.  More
details on each in subsections below.

* Major typing upgrades, including:
  * Exact object types -- use them in most cases.
    Discussion in 61d2e3426.
  * Intersection types -- probably never use them.
    Discussion in ff515bc9d and 124a2f39a.
  * Read-only arrays -- use them in most cases.
    Discussion in 4c3aaa0b1.

* New patterns for getting styles: static where possible, and
  otherwise using new React context API instead of legacy one.
  All new code should follow.  Examples in a2bfcb41b, 51dd1b3b2,
  f6ddc2dba.

* The type `Account` is no longer the same as `Auth`.
  In either case, `Identity` is preferred where it suffices.
  Changed in 5738ccb6f, as part of notifications changes.

* `getAuth` and other account-related selectors no longer return
  malformed data.  Some throw; others explicitly can return
  `undefined`.  Interfaces in jsdoc in `accountsSelectors.js`;
  discussion in 33a4df218.

* We no longer lie to Redux through `areStatesEqual`!  See #3163.

* Automated refactoring is pretty great!  Discussion in e566058bf of
  one approach.  Lower-tech approaches already helped powerfully for
  migrating to exact types, and to new `styles` API.


#### Workflow improvements

* Experimented with automated refactoring: an AST-based tool
  `jscodeshift`, and lower-tech Perl one-liners.  (`jscodeshift`
  discussed in e566058bf, used in 47365203f.  Perl one-liners on
  several occasions; see `git log --grep perl`.)

* `tools/test` accepts `--diff COMMIT`: run only on files changed
  since `COMMIT` (vs. default of files changed in current branch.)
  (1fe380e1a)

* Reactotron disabled by default, because it broke basic app
  functionality. :'-( (170ed2a32, 598386524)

* New script `tools/changelog` streamlines some steps of making a
  release. (593d38d06^..9dfb52e24)


#### Architecture, interface, and quality improvements

* Most object types are now exact.  Let's do more of that.
  (Discussion in 61d2e3426; additional changes in
  a15c00e1a^..b9b48657f, 703739338, e5e57abe3^..9c1898242)

* Intersection types nearly all replaced with object spread.
  (Discussion in ff515bc9d and 124a2f39a; additional changes in
  eb3783b1a^..47365203f)

* New patterns for getting styles: static where possible, and
  otherwise using new React context API instead of legacy one.  Most
  existing code migrated; all new code should follow. (examples in
  a2bfcb41b, 51dd1b3b2, f6ddc2dba; fuller changes in
  112f99be9^..8dad2d191, 1f71edad9^..a4e0f23b3)

* Major parts of notifications code rewritten, others refactored;
  the wix `react-native-notifications` library reduced to a small
  role.  (Context in #2877.  Changes in 410041dfa^..2ed116267,
  dcbe2ac86^..d6454eb50, 034e25be8^..3a2076e0f, f1eae82d8^..233d68c40)

* Rewrote `accountsSelectors.js`.  Now `getAuth` can only return a
  real, authentication-bearing value.  (Discussion in 33a4df218;
  changes in 3706965d3^..614f56bd2, f1eae82d8)

* Removed the `connectPreserveOnBackOption` hack, where we told lies
  to Redux via `areStatesEqual`. (#3163, da6c43d4b^..cd7b25757)

* Server API bindings describe more routes (even that the app doesn't
  use); route bindings have a more uniform signature, and link to API
  docs. (1acf7d96a^..8170045d8, 0af4af22b^..6becc6e91

* We subscribe to all server events with our queue.
  (d8b36412c^..6c7fffc76)

* Logic fixes in Android notification UI code for sound and vibration;
  no visible changes yet. (125dc0806^..458ef8832)

* Don't run old migrations on first install. (863bca711)

* Don't use `console.warn`. (21f64aad7)

* More read-only array types. (4c3aaa0b1)

* Translated-message files moved out of `src/`, to `static`, to avoid
  spamming grep results. (1fc26a512)

* Upgraded RN to v0.57.8, from v0.57.1. (c03c85684^..ca759b106,
  329dd67f0)

* New script `tools/upgrade` to help systematize upgrading
  dependencies. (b64ce0023^..eb130c631)



## 21.2.106 (2018-12-12)

### Highlights for users (since 20.0.103)

Many fixes and improvements, including:
* Full support for custom emoji, including in composing messages and
  in reactions.
* Fetch updates much sooner when reopened after several minutes idle.
* Fixed bug: a message view seen shortly after starting the app could
  show "No messages".
* Fixed bug: uploading an image while viewing a stream would go to the
  wrong topic.
* Fixed bug: a draft message typed just after starting the app was
  lost.
* Complete translations for Italian and Korean.


### Full changes for users (since 21.1.105)

* Fixed a regression in 21.0.104: the autocomplete popup would sometimes
  not respond when touched. (#3209)


## (beta) 21.1.105 (2018-12-11)

This was a beta version that did not become a production release;
see above.


### Full changes for users (since 21.0.104)

* Fixed issue where a message view seen shortly after starting the app
  could show "No messages". (#3162)
* Fixed issue where uploading an image while viewing a stream would go
  to the wrong topic. (#3130)
* Fixed a regression in 21.0.104: the password input for logging into
  a server was rendered in a broken way, looking empty. (#3182)


### Full changes for developers (since 21.0.104)

#### Workflow improvements

* `tools/test` accepts a `--fix` option.  (177d3eaa9)


#### Architecture, interface, and quality improvements

* New internal API `withGetText` for acquiring a handy
  string-translating function, to use in any part of the app that
  isn't a React component. (#2812; c22dfee9b^..9eaa05c27)
* New experimental internal API for the (server) API bindings:
  `import api from ...`, then `api.sendMessage(...)` etc.
  (63ae59808^..acb979cf5)
* We no longer write `props: Props`, or where applicable
  `state: State`, at the top of each React component; the type
  arguments to `PureComponent` or `Component` express that already.
  (7e3becfba, c5df77962)
* A good swath of our uses of `any` and `Object` are replaced with
  real types, and 20 more files are marked strict-local; 60 to go.
  (9a0df7416^..60f14ed83)


## (beta) 21.0.104 (2018-12-05)

This was a beta version that did not become a production release;
see the regression fix above.


### Full changes for users

* Added full support for custom emoji ("realm emoji"), including in
  composing messages and in reactions. (#2129, #2846)
* The app now fetches updates much sooner when reopened after several
  minutes idle. (#3190)
* Fixed issue where a draft message typed just after starting the app
  was lost. (#2861)
* Complete translations for Italian and Korean. (62c8d92d8)
* Fixed missing line that made switching to Indonesian language not
  work. (d92329bb4)
* Messages pending send can now be deleted in long-press menu, like
  other messages. (#3189)
* Force-upgrade screen provides helpful App Store or Play Store
  deep-link. (#3158)
* Fixed handling of old reactions with emoji that have changed
  name. (#3169)
* Fixed misrendering of "keypad" emoji like `:zero:`. (#3129)
* Group PM conversations now show combined avatars with rounded
  corners, like individual avatars. (#3167)
* Fixed bugs causing top bar to sometimes be white instead of
  stream-colored. (#2797, #3139)
* Long-pressing a recipient bar now offers "Unmute topic" when
  appropriate. (8b60314e0 / #3156)
* Alert words are now highlighted in the message list. (#3082)
* Fixed fetching of explicit avatars (`!avatar(...)`) in messages. (#3047)
* Overflow menu in lightbox is now properly aligned. (#3024)
* Send button has larger touch target. (#2945)
* Error banners in message list show as red, rather than gray.
* Fixed oversizing of images in Dropbox inline previews. (#3136)
* Various improvements across the app for latency and performance.


### Full changes for developers

#### Workflow improvements

* Tests and linters run fast by default (<5s on a fast desktop for
  small changes, <1s for no changes), by running only on files changed
  in the current branch. (977596d9e^..bd24bd1be)
* Spell-checker results are now pure warnings, free to ignore. (ff7bc2992)
* Configuration for Reactotron, and expanded developer documentation
  on debugging. (#3109, 0e5d03631^..59967fc23)
* One-step release-mode Android builds without signing keys or
  Sentry. (#2883; 8d55447be^..ee40b3c7b)
* Detailed step-by-step instructions for setting up dev environment on
  WSL. (#3193)

#### Architecture, interface, and quality improvements

* Extensive refactoring of the message list and rendering to
  HTML. (#3156, #3170)
* New `caseNarrow` abstraction for working with narrow objects.
  (fa6134aa6^..e9fe1e801)
* Explain `Auth` vs. `Account` types, and introduce distinct
  `Identity`. (f5a2603a4^..28b1177d3)
* Applied `@flow strict-local` to most files and `@flow strict` to
  many files, fixing newly-exposed type issues. (#3164, 6efa7980c,
  2a96ede50, fa1b8a85c; 5ec1d3f9d^..597c51f6e; 5a2d49f85^..da5d519bf)
* Began to use more Flow "exact types". (01003e619, 24211fb55, others)
* Flow types on many more areas of code.
* Enable ESLint in most places where it was disabled, fixing issues.
  (ddd51e5eb^..a533fa8d8)
* Scripts run on Bash, and are moved out of package.json to their own
  files. (6c25beeb0, 3119ec697, 8d3e8ade5^..4d58c11d8)


## 20.0.103 (2018-11-12)

### Highlights

Many fixes and improvements, including:
* Mark messages you see as read, even in a short thread.
* Tapping an emoji reaction works again to add/remove your own.
* Messages you send no longer flicker when they reach the server.
* Translation updates. Complete translations for Polish and
  Portuguese, the latter nearly from scratch!


### Full

* Mark messages you see as read, even in a short thread. (#2988)
* Tapping an emoji reaction works again to add/remove your own. (#2784)
* Messages you send no longer flicker when they reach the server. (#2483)
* Translation updates.  Complete translations for Polish and
  Portuguese, the latter nearly from scratch!
* (iOS) Downloading a shared image works again. (#2618)
* (iOS) Fix multiple bugs affecting autocorrect when typing a message.
  (#3052, #3053)
* (iOS) New React Native version 0.57 no longer breaks typing in
  Chinese or Japanese. (#2434)
* (Android) New React Native version 0.57 no longer crashes when
  typing an astral-plane Unicode character, including post-2009
  emoji. (#2787)
* (Android) Fix crash when downloading a file, by requesting needed
  permissions. (#3115)
* SSO login was broken. (#3126)
* (Android, infra) Client-side support for removing notifications when
  you read the messages elsewhere. (#2634)
* (infra) Updated to React Native v0.57 (from v0.55). (#2789)


## 19.2.102 and earlier

TODO: backfill some of this information from notes in other places.
