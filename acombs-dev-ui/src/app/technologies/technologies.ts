/** One reason to like a technology's latest release. */
export interface Highlight {
  title: string;
  detail: string;
}

/**
 * The latest release of a technology as of `CHECKED_ON`, from its official release notes or
 * announcements. Cloud services ship continuously, so theirs is the run of recent launches.
 */
export interface LatestRelease {
  version: string;
  released: string;
  /** The version this site runs, when it differs from the latest. */
  usedHere?: string;
  summary: string;
  highlights: Highlight[];
  source: { label: string; url: string };
}

/** A dashboard card and its page: shows `logo` (a local SVG in public/logos) or, when no licensed logo is bundled, a Material `icon`. */
export interface Technology {
  slug: string;
  name: string;
  logo?: string;
  icon?: string;
  description: string;
  usage: string;
  latest: LatestRelease;
}

export interface TechnologyGroup {
  label: string;
  icon: string;
  technologies: Technology[];
}

/** When the latest releases below were last checked against their release notes. */
export const CHECKED_ON = 'November 11, 2026';

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    label: 'Front-end',
    icon: 'web',
    technologies: [
      {
        slug: 'angular', name: 'Angular', logo: 'logos/angular.svg', description: 'Front-end framework',
        usage: 'Builds the app screens and keeps the navigation, theme, and API status in sync with application state.',
        latest: {
          version: 'Angular 22.2', released: 'v22 on June 3, 2026; 22.2.5 on November 6, 2026', usedHere: 'Angular 21.2',
          summary: 'Angular 22 makes the signal-based way of building apps the finished, default way: forms, async data and accessibility patterns all reached production status.',
          highlights: [
            { title: 'Signal Forms are stable', detail: 'A reactive, composable forms API built on signals, now production-ready with full documentation and support in Angular Material and Angular Aria.' },
            { title: 'Async reactivity is stable', detail: 'resource, rxResource and httpResource load data with signal ergonomics, and gain chain() for dependent requests and resource caching for server-side rendering.' },
            { title: 'OnPush by default', detail: 'New components use OnPush change detection unless told otherwise; the old default lives on under the name Eager.' },
            { title: 'Angular Aria is production-ready', detail: 'Headless, accessible interaction patterns for building inclusive components of your own.' },
            { title: 'Built for AI assistants', detail: 'The CLI\'s MCP server is stable, Angular Agent Skills teach assistants the framework\'s conventions, and WebMCP support arrives as an experiment.' },
            { title: 'A leaner toolchain', detail: 'Requires TypeScript 6, drops Node.js 20 and deprecates the webpack-based builders in favour of the esbuild and Vite pipeline.' },
          ],
          source: { label: 'Announcing Angular v22 (Angular blog)', url: 'https://blog.angular.dev/announcing-angular-v22' },
        },
      },
      {
        slug: 'angular-material', name: 'Angular Material', logo: 'logos/angularmaterial.svg', description: 'Material Design 3 components and theming',
        usage: 'Provides the toolbar, navigation drawer, dialogs, cards, buttons, and theme-aware controls; its theme-color schematic generated the palettes from the single #3F51B5 indigo.',
        latest: {
          version: 'Angular Material 22.2', released: 'v22 on June 3, 2026; 22.2.7 in November 2026', usedHere: 'Angular Material 21.2',
          summary: 'Material ships in lockstep with Angular, so version 22 brings its components up to date with the framework\'s signal-first features.',
          highlights: [
            { title: 'Works with Signal Forms', detail: 'Form fields, inputs and selects plug straight into Angular 22\'s stable Signal Forms.' },
            { title: 'Material 3 theming from one colour', detail: 'mat.theme and the theme-color schematic turn a single brand colour into full tonal palettes, exposed as --mat-sys-* CSS variables, as this site does from #3F51B5.' },
            { title: 'Light and dark from the same theme', detail: 'The system tokens resolve per colour scheme, so components follow light and dark mode without separate stylesheets.' },
            { title: 'Accessible by default', detail: 'Keyboard support, focus management and ARIA come built in, and pair with the newly production-ready Angular Aria patterns.' },
          ],
          source: { label: 'Angular Components releases (GitHub)', url: 'https://github.com/angular/components/releases' },
        },
      },
      {
        slug: 'angular-cdk', name: 'Angular CDK', logo: 'logos/angularmaterial.svg', description: 'Component Dev Kit behavior primitives',
        usage: 'Watches screen-size breakpoints so the navigation drawer docks on wide screens and overlays on narrow ones.',
        latest: {
          version: 'Angular CDK 22.2', released: 'v22 on June 3, 2026; 22.2.7 in November 2026', usedHere: 'Angular CDK 21.2',
          summary: 'The CDK is the unstyled foundation under Angular Material: behaviour without looks, for building your own components.',
          highlights: [
            { title: 'Angular Aria builds on it', detail: 'The Components team\'s headless accessibility patterns, production-ready in v22, extend the CDK\'s approach of behaviour without styling.' },
            { title: 'Layout and breakpoints', detail: 'BreakpointObserver reports media-query matches as observables, which this site turns into a signal to switch the drawer between side and overlay modes.' },
            { title: 'Overlays, drag and drop, virtual scrolling', detail: 'Positioned overlays, sortable drag and drop and virtual scrolling for long lists, all without importing a single Material style.' },
            { title: 'Accessibility utilities', detail: 'Focus traps, live announcers, list key managers and the cdk-visually-hidden class this site uses for screen-reader-only text.' },
          ],
          source: { label: 'Angular Components releases (GitHub)', url: 'https://github.com/angular/components/releases' },
        },
      },
      {
        slug: 'angular-signals', name: 'Angular Signals', logo: 'logos/angular.svg', description: 'Reactive application state',
        usage: 'Hold the theme brightness, selected tab, drawer state, and API status, so the screens update automatically whenever any of them change.',
        latest: {
          version: 'Angular 22.2', released: 'v22 on June 3, 2026', usedHere: 'Angular 21.2',
          summary: 'With Angular 22 the signals story is complete: state, derived state, async data and forms are all signal-based and stable.',
          highlights: [
            { title: 'resource and httpResource are stable', detail: 'Async data is a signal too: a resource exposes its value, loading state and error, and re-fetches when the signals it reads change.' },
            { title: 'chain() for dependent requests', detail: 'One resource can wait on another\'s result without hand-written effects.' },
            { title: 'Signal Forms', detail: 'Form state, validation and errors are signals, so templates and computed values react to them directly.' },
            { title: 'OnPush by default', detail: 'Signals tell Angular exactly what changed, so v22 makes the targeted OnPush strategy the default for new components.' },
            { title: 'The core is mature', detail: 'signal, computed, effect, linkedSignal and toSignal are all stable, the toolkit this site uses for its theme, tabs and API status.' },
          ],
          source: { label: 'Signals guide (angular.dev)', url: 'https://angular.dev/guide/signals' },
        },
      },
      {
        slug: 'typescript', name: 'TypeScript', logo: 'logos/typescript.svg', description: 'Typed application code',
        usage: 'Defines types for the technology cards and services so mistakes can be caught during development.',
        latest: {
          version: 'TypeScript 7.0', released: 'July 8, 2026', usedHere: 'TypeScript 5.9',
          summary: 'TypeScript 7 is the compiler rewritten in Go, the long-promised native port, and it is roughly ten times faster.',
          highlights: [
            { title: '8 to 12 times faster builds', detail: 'The VS Code codebase builds in 10.6 seconds instead of 125.7, and in 7.5 seconds with --checkers 8.' },
            { title: 'Parallel by design', detail: 'Parsing, type-checking and emit run in parallel, tuned with the new --checkers, --builders and --singleThreaded flags.' },
            { title: 'A faster editor', detail: 'In VS Code, the first error now appears in under 1.3 seconds instead of about 17.5, with far fewer language server failures and crashes.' },
            { title: 'Less memory', detail: 'Memory use drops by 6 to 26 percent across the projects Microsoft measured.' },
            { title: 'Modern defaults', detail: 'strict is on by default, and long-deprecated options such as target es5, baseUrl and the AMD, UMD and SystemJS module formats are now errors.' },
            { title: 'One caveat', detail: '7.0 has no programmatic API yet (planned for 7.1), so tools that embed the compiler, Angular\'s template checker among them, still run on TypeScript 6.' },
          ],
          source: { label: 'Announcing TypeScript 7.0 (Microsoft)', url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/' },
        },
      },
      {
        slug: 'rxjs', name: 'RxJS', logo: 'logos/rxjs.svg', description: 'Reactive HTTP and async handling',
        usage: 'Handles asynchronous UI events and the repeating API health check.',
        latest: {
          version: 'RxJS 7.8', released: '7.8.2 is the current release',
          summary: 'RxJS 7 remains the production line: stable, fast and everywhere in the Angular ecosystem, while the next major is rebuilt around the web platform\'s own Observable.',
          highlights: [
            { title: 'Stable and dependable', detail: 'RxJS 7 has been the production version for years, the observable library underneath Angular\'s HttpClient, router and CDK.' },
            { title: 'Smaller and faster than 6', detail: 'Version 7 reworked the internals for a smaller bundle and better performance, and typed operators far more precisely.' },
            { title: 'Interop with signals', detail: 'Angular\'s toSignal and toObservable bridge the two models, which is how this site\'s API health check feeds its footer icon.' },
            { title: 'What comes next', detail: 'RxJS 8 never left prerelease; the project now plans RxJS 9 around the Web Platform\'s native Observable proposal.' },
          ],
          source: { label: 'RxJS on GitHub', url: 'https://github.com/ReactiveX/rxjs' },
        },
      },
      {
        slug: 'sass', name: 'Sass', logo: 'logos/sass.svg', description: 'Theme and component styling',
        usage: 'Styles the responsive layout and generates colors for the adjustable light-to-dark theme.',
        latest: {
          version: 'Dart Sass 1.108', released: '1.108.2, November 2026', usedHere: 'Dart Sass 1.97',
          summary: 'Dart Sass keeps modernising the language with the module system and CSS Color 4, while preparing the ground for Dart Sass 2.0.',
          highlights: [
            { title: 'First-class modules', detail: 'Since 1.105, modules can be loaded and passed around as values with meta.load() and meta.get-module(), and included as CSS with the meta.css() mixin.' },
            { title: 'Ready for Dart Sass 2.0', detail: '--fatal-deprecation=dart-sass-2 turns every deprecation that 2.0 will make an error into one today, so you can upgrade early.' },
            { title: 'Goodbye @import', detail: '@import is deprecated in favour of @use and @forward, which give each file its own namespace and load it once.' },
            { title: 'Modern colour', detail: 'Full CSS Color 4 support: lab, lch, oklch and wide-gamut spaces, with colour maths done in the space you choose. This site mixes its theme colours with sass:color.' },
          ],
          source: { label: 'Dart Sass changelog', url: 'https://github.com/sass/dart-sass/blob/main/CHANGELOG.md' },
        },
      },
      {
        slug: 'svg', name: 'SVG', icon: 'grid_on', description: 'Inline vector graphics',
        usage: 'Draws the toolbar\'s pixel mosaic inline, filled with the theme\'s primary and secondary colors so it follows light/dark mode and the brightness slider.',
        latest: {
          version: 'SVG 2', released: 'W3C Candidate Recommendation, supported by all modern browsers',
          summary: 'SVG is a living part of the web platform rather than a library, and its newest standard, SVG 2, folds it ever closer into HTML and CSS.',
          highlights: [
            { title: 'Styled by CSS', detail: 'Fill, stroke and many geometry properties are CSS properties, so currentColor and CSS variables theme an SVG like any other element, as the logo and mosaic here do.' },
            { title: 'Inline in HTML', detail: 'SVG elements live in the page\'s DOM, so Angular templates can bind to them and screen readers can be told to skip decorative ones with aria-hidden.' },
            { title: 'paint-order and vector effects', detail: 'Strokes can be painted under fills, and non-scaling strokes keep their width when a drawing is resized.' },
            { title: 'Crisp at any size', detail: 'One file serves a 16-pixel tab icon and an 88-pixel toolbar logo with no blur, as this site\'s logo does.' },
          ],
          source: { label: 'SVG 2 specification (W3C)', url: 'https://www.w3.org/TR/SVG2/' },
        },
      },
      {
        slug: 'material-icons-and-lato', name: 'Material Icons & Lato', icon: 'font_download', description: 'Icon font and typeface from Google Fonts',
        usage: 'Loads the Material Icons font used for every icon in the app and the Lato typeface used for its text from Google Fonts.',
        latest: {
          version: 'Material Symbols', released: 'The current generation of Google\'s icon font',
          usedHere: 'Material Icons (classic) and Lato',
          summary: 'Material Icons is still maintained, and its successor, Material Symbols, packs thousands of icons into one variable font.',
          highlights: [
            { title: 'One variable font, many styles', detail: 'Material Symbols has axes for fill, weight, grade and optical size, so one font covers outlined, rounded and sharp icons at any thickness.' },
            { title: 'Ligatures', detail: 'Writing the icon\'s name, such as sports_baseball, renders the glyph, which is how every icon on this site is drawn.' },
            { title: 'Icons as vectors', detail: 'Each glyph is a vector outline: this site extracts the four sports glyphs straight from the font for its logos and the Cards link.' },
            { title: 'Lato', detail: 'A warm, highly legible sans-serif by Łukasz Dziedzic, served by Google Fonts in the weights this site uses for its text.' },
          ],
          source: { label: 'Material Symbols guide (Google Fonts)', url: 'https://developers.google.com/fonts/docs/material_symbols' },
        },
      },
      {
        slug: 'vitest', name: 'Vitest', logo: 'logos/vitest.svg', description: 'Front-end unit tests',
        usage: 'Runs the component and service tests in a jsdom browser environment, including the theme controls and the API health indicator.',
        latest: {
          version: 'Vitest 5.1', released: 'v5 on September 3, 2026', usedHere: 'Vitest 4.1',
          summary: 'Vitest 5 is a performance release with new debugging tools, and tightens a few defaults so tests catch more mistakes.',
          highlights: [
            { title: 'Faster test runs', detail: 'Most setups run 8 to 25 percent faster; a dependency-heavy suite went from 1.59 to 0.74 seconds.' },
            { title: 'Trace View', detail: 'Browser Mode can record DOM snapshots of every interaction and assertion, to replay a failing test step by step.' },
            { title: 'vitest doctor', detail: 'A new command reruns your suite under other configurations and suggests faster ones.' },
            { title: 'Nested projects', detail: 'A project referenced from the root config can declare its own projects, which suits monorepos.' },
            { title: 'Stricter by default', detail: 'Unawaited resolves and rejects assertions now fail the test, and mock call history clears before every test.' },
            { title: 'Mocks for the new APIs', detail: 'Fake timers cover the Temporal API, and vi.when sets different return values for different arguments.' },
          ],
          source: { label: 'Vitest 5 announcement', url: 'https://vitest.dev/blog/vitest-5' },
        },
      },
      {
        slug: 'angular-cli', name: 'Angular CLI', logo: 'logos/angular.svg', description: 'Front-end build and dev server',
        usage: 'Builds the production bundle with esbuild, runs the tests, and serves the app locally through a Vite dev server with a proxy to the API.',
        latest: {
          version: 'Angular CLI 22.2', released: 'v22 on June 3, 2026; 22.2.6 in November 2026', usedHere: 'Angular CLI 21.2',
          summary: 'The CLI now runs entirely on the modern esbuild and Vite pipeline, with Vitest for tests and an MCP server for AI assistants.',
          highlights: [
            { title: 'esbuild and Vite everywhere', detail: 'The webpack-based builders are deprecated in v22; the esbuild application builder and Vite dev server are the way forward.' },
            { title: 'Vitest as the test runner', detail: 'ng test runs Vitest, as it does for this site, replacing Karma and Jasmine.' },
            { title: 'A stable MCP server', detail: 'AI assistants can ask the CLI about your workspace, best practices and documentation through the Model Context Protocol.' },
            { title: 'Guided upgrades', detail: 'ng update @angular/cli@^22 @angular/core@^22 applies the migrations, such as the switch to OnPush by default.' },
          ],
          source: { label: 'Angular CLI overview (angular.dev)', url: 'https://angular.dev/tools/cli' },
        },
      },
      {
        slug: 'nodejs-and-npm', name: 'Node.js & npm', logo: 'logos/nodejs.svg', description: 'JavaScript runtime and package manager',
        usage: 'Runs the Angular CLI and installs the front-end dependencies listed in package.json.',
        latest: {
          version: 'Node.js 26 LTS', released: 'v26 on May 5, 2026; Active LTS since October 28, 2026', usedHere: 'Node.js 24 LTS',
          summary: 'Node.js 26 is the new long-term support line, bringing the Temporal date API and a newer V8 to production.',
          highlights: [
            { title: 'Temporal on by default', detail: 'The modern date and time API, a far more robust replacement for the legacy Date object, needs no flag.' },
            { title: 'V8 14.6', detail: 'Adds Map.prototype.getOrInsert() and getOrInsertComputed() for upserts, and Iterator.concat() for chaining iterators.' },
            { title: 'Undici 8', detail: 'The engine behind the built-in fetch moves to its next major version.' },
            { title: 'Legacy APIs removed', detail: 'writeHeader(), the old _stream_* modules and --experimental-transform-types are gone.' },
            { title: 'A new release rhythm', detail: '26 is the last release on the odd-even schedule: from 27, Node.js ships one major a year in April and promotes it to LTS each October.' },
          ],
          source: { label: 'Node.js 26.0.0 release notes', url: 'https://nodejs.org/blog/release/v26.0.0' },
        },
      },
    ],
  },
  {
    label: 'Back-end',
    icon: 'dns',
    technologies: [
      {
        slug: 'java', name: 'Java', logo: 'logos/java.svg', description: 'Back-end language',
        usage: 'Implements the server-side API, ready for endpoints to be added alongside its health check.',
        latest: {
          version: 'Java 27', released: 'September 15, 2026', usedHere: 'Java 21 LTS (Java 25 is the newest LTS)',
          summary: 'JDK 27 brings nine JEPs that make the platform faster by default and ready for post-quantum cryptography.',
          highlights: [
            { title: 'Post-quantum TLS', detail: 'Hybrid key exchange for TLS 1.3 (JEP 527) protects today\'s traffic against tomorrow\'s quantum computers.' },
            { title: 'Compact object headers by default', detail: 'Smaller object headers (JEP 534) cut heap use without changing a line of code.' },
            { title: 'G1 everywhere', detail: 'G1 becomes the default garbage collector in all environments (JEP 523), including small containers.' },
            { title: 'JFR data redaction', detail: 'Flight Recorder can redact sensitive data in-process (JEP 536), so recordings are safer to share.' },
            { title: 'Previews to try', detail: 'Lazy constants, structured concurrency, primitive types in patterns and PEM encodings continue as previews, alongside the Vector API incubator.' },
          ],
          source: { label: 'JDK 27 (OpenJDK)', url: 'https://openjdk.org/projects/jdk/27/' },
        },
      },
      {
        slug: 'spring-boot', name: 'Spring Boot', logo: 'logos/spring.svg', description: 'REST API',
        usage: 'Runs the backend, exposes its health endpoint, and loads configuration from environment variables or a local, untracked .env file.',
        latest: {
          version: 'Spring Boot 4.1', released: 'v4.1.0 on June 10, 2026; 4.1.2 on October 22, 2026', usedHere: 'Spring Boot 3.5',
          summary: 'Spring Boot 4.1 builds on the 4.0 generation (Spring Framework 7) with gRPC, safer HTTP clients and better observability.',
          highlights: [
            { title: 'gRPC support', detail: 'Auto-configured gRPC servers and clients, with dedicated server, client and test modules backed by Spring gRPC.' },
            { title: 'SSRF protection for HTTP clients', detail: 'Outgoing requests can be filtered by address with InetAddressFilter, blocking server-side request forgery.' },
            { title: 'OpenTelemetry the standard way', detail: 'Boot reads most of the OpenTelemetry environment variables, so telemetry is configured the same way as any other OpenTelemetry app.' },
            { title: 'More configurable JSON', detail: 'Updated Jackson configuration properties and customisation options, plus file rotation for Log4j.' },
            { title: 'The 4.x foundation', detail: 'Spring Framework 7, a modular codebase, JSpecify null-safety and built-in API versioning arrived with 4.0 and carry forward.' },
          ],
          source: { label: 'Spring Boot 4.1.0 available now (spring.io)', url: 'https://spring.io/blog/2026/06/10/spring-boot-4/' },
        },
      },
      {
        slug: 'spring-boot-actuator', name: 'Spring Boot Actuator', logo: 'logos/spring.svg', description: 'Health monitoring',
        usage: 'Exposes the public health check endpoint that drives the API status indicator in the footer, allowing the deployed UI\'s origin through CORS.',
        latest: {
          version: 'Spring Boot 4.1', released: 'June 10, 2026', usedHere: 'Spring Boot 3.5',
          summary: 'Actuator ships with every Spring Boot release, and 4.1 puts observability through standard OpenTelemetry configuration.',
          highlights: [
            { title: 'OpenTelemetry environment variables', detail: 'Metrics and traces export over OTLP configured by the standard OTEL_* variables, so any OpenTelemetry backend works.' },
            { title: 'Health that composes', detail: 'Health indicators and groups roll up into one status, the endpoint behind this site\'s cloud icon.' },
            { title: 'Micrometer observations', detail: 'One instrumentation API produces both metrics and traces for HTTP requests, data access and your own code.' },
            { title: 'Production-ready endpoints', detail: 'Info, metrics, loggers, environment and more, each exposed over HTTP or JMX only when you opt in.' },
          ],
          source: { label: 'Actuator reference (Spring Boot 4.1)', url: 'https://docs.spring.io/spring-boot/4.1/reference/actuator/index.html' },
        },
      },
      {
        slug: 'swagger-ui', name: 'Swagger UI', logo: 'logos/swagger.svg', description: 'Interactive API documentation via springdoc-openapi',
        usage: 'Generates OpenAPI docs for any endpoints added under /api, so they can be explored and tried from the browser.',
        latest: {
          version: 'springdoc-openapi 3.2 with Swagger UI 5.34', released: 'springdoc 3.2.0 on October 24, 2026; Swagger UI 5.34.1 on October 30, 2026',
          usedHere: 'springdoc-openapi 2.10',
          summary: 'springdoc 3 is the generation for Spring Boot 4, and 3.2 tracks Boot 4.1 with richer, more precise API documents.',
          highlights: [
            { title: 'Built for Spring Boot 4', detail: 'springdoc 3.x supports Spring Boot 4 and Spring Framework 7, including its built-in API versioning.' },
            { title: 'Nullability you can trust', detail: 'Properties annotated @Nullable (JSpecify, Spring or JSR-305) can be marked nullable in the generated schema.' },
            { title: 'Reusable polymorphic models', detail: 'oneOf variants can be emitted as named, reusable components, which keeps generated clients tidy.' },
            { title: 'More accurate versions and types', detail: 'Each operation lists only the API versions it serves, and always-present properties are marked required.' },
            { title: 'Your choice of UI', detail: 'Swagger UI 5 ships by default, with Scalar available as an alternative interface.' },
          ],
          source: { label: 'springdoc-openapi releases (GitHub)', url: 'https://github.com/springdoc/springdoc-openapi/releases' },
        },
      },
      {
        slug: 'junit', name: 'JUnit', logo: 'logos/junit.svg', description: 'Back-end unit tests',
        usage: 'Tests the health endpoint and its cross-origin rules, and the Lambda adapter\'s handling of function URL responses, without deploying.',
        latest: {
          version: 'JUnit 6.1', released: 'v6.1.0 in May 2026; 6.1.3 in August 2026', usedHere: 'JUnit 5 (managed by Spring Boot 3.5)',
          summary: 'JUnit 6 modernises the platform on a Java 17 baseline, and 6.1 adds the first round of new features on top.',
          highlights: [
            { title: 'One version for everything', detail: 'Platform, Jupiter and Vintage now share a single version number, so upgrading is one change.' },
            { title: 'Null-safe APIs', detail: 'JSpecify annotations document which parameters and results can be null, for both Java and Kotlin callers.' },
            { title: 'Locale and time zone built in', detail: '@DefaultLocale and @DefaultTimeZone, adopted from JUnit Pioneer, pin them for a test.' },
            { title: 'A new parallel executor', detail: 'An opt-in worker-thread-pool executor is available as an alternative to the ForkJoinPool default.' },
            { title: 'Tests in compact source files', detail: 'The new org.junit.start module supports Java\'s compact source files for quick, single-file tests.' },
          ],
          source: { label: 'JUnit release notes', url: 'https://docs.junit.org/current/release-notes/' },
        },
      },
      {
        slug: 'maven', name: 'Maven', logo: 'logos/maven.svg', description: 'Back-end build and dependency management',
        usage: 'Downloads Java dependencies and builds and tests the Spring Boot API.',
        latest: {
          version: 'Maven 3.10', released: '3.10.0 in 2026 (Maven 4.0 is at release candidate 7)',
          summary: 'Maven 3.10 brings Maven 4\'s dependency resolver to the Maven 3 line, with reproducible builds and tighter security by default.',
          highlights: [
            { title: 'Maven 4\'s resolver', detail: 'Resolver 2.x adds version range filtering, better repository filtering, a transitive dependency manager and user-defined relocations.' },
            { title: 'Reproducible builds by default', detail: 'The Super POM sets project.build.outputTimestamp, so the same sources produce byte-identical artifacts.' },
            { title: 'Security hardening', detail: 'Credentials are scoped to repository origins and server IDs must match exactly.' },
            { title: 'Extensions everywhere', detail: 'Extensions can be configured per user (~/.m2/extensions.xml) or per installation, not just per project.' },
            { title: 'Clearer output', detail: 'The reactor summary lists every module again, with failures reported last.' },
          ],
          source: { label: 'Maven 3.10.0 release notes', url: 'https://maven.apache.org/docs/3.10.0/release-notes.html' },
        },
      },
      {
        slug: 'spring-boot-devtools', name: 'Spring Boot DevTools', logo: 'logos/spring.svg', description: 'Development-time restarts',
        usage: 'Restarts the API automatically when code changes during development; it is excluded from production builds.',
        latest: {
          version: 'Spring Boot 4.1', released: 'June 10, 2026', usedHere: 'Spring Boot 3.5',
          summary: 'DevTools ships with every Spring Boot release and keeps the edit-and-run loop fast.',
          highlights: [
            { title: 'Fast automatic restarts', detail: 'Two class loaders keep libraries loaded and reload only your code, so a restart takes a fraction of a cold start.' },
            { title: 'Development-friendly defaults', detail: 'Template caching and similar production optimisations are switched off while developing.' },
            { title: 'Never in production', detail: 'DevTools disables itself in a packaged application and is left out of the built jar, as it is from this API\'s Lambda package.' },
            { title: 'Global settings', detail: 'A ~/.config/spring-boot file applies your DevTools preferences to every project on your machine.' },
          ],
          source: { label: 'DevTools reference (Spring Boot 4.1)', url: 'https://docs.spring.io/spring-boot/4.1/reference/using/devtools.html' },
        },
      },
    ],
  },
  {
    label: 'Cloud',
    icon: 'cloud',
    technologies: [
      {
        slug: 'aws-lambda', name: 'AWS Lambda', icon: 'bolt', description: 'Serverless API hosting',
        usage: 'Runs the Spring Boot API on Java 21 (arm64) through aws-serverless-java-container, with SnapStart to cut cold starts and a live alias behind a function URL.',
        latest: {
          version: 'Recent launches', released: 'Through November 2026', usedHere: 'Java 21 runtime on arm64, with SnapStart',
          summary: 'Lambda keeps extending what a function can be: long-running durable workflows, faster starts for more packaging types and newer Java runtimes.',
          highlights: [
            { title: 'Durable functions for Java', detail: 'The Durable Execution SDK for Java (generally available April 2026) lets a function pause for up to a year waiting on events, without paying for the wait.' },
            { title: 'SnapStart for container images', detail: 'Since September 2026, SnapStart, which this API uses, also cuts container-image start-up from seconds to as little as sub-second.' },
            { title: 'Java 25 runtime', detail: 'The latest Java LTS has been available as a managed runtime since November 2025.' },
            { title: 'Spring Boot 4 adapter', detail: 'aws-serverless-java-container 3.x runs Spring Boot 4 applications, ready for this API\'s next upgrade.' },
          ],
          source: { label: 'AWS What\'s New: Lambda', url: 'https://aws.amazon.com/about-aws/whats-new/2026/04/lambda-durable-execution-java-ga/' },
        },
      },
      {
        slug: 'amazon-cloudfront', name: 'Amazon CloudFront', icon: 'public', description: 'Content delivery and HTTPS',
        usage: 'Serves the UI at the app domain and the API at its api subdomain over HTTPS, caching the UI files and passing API requests straight to Lambda.',
        latest: {
          version: 'Recent launches', released: 'Through November 2026',
          summary: 'CloudFront\'s recent launches make caches easier to control, pricing more predictable and private origins more capable.',
          highlights: [
            { title: 'Invalidation by cache tag', detail: 'Remove a whole group of related cached objects in one request (April 2026).' },
            { title: 'Flat-rate pricing plans', detail: 'Predictable monthly plans that bundle delivery and security, now manageable through the API, CLI and CloudFormation (September 2026).' },
            { title: 'OAC for S3 Multi-Region Access Points', detail: 'Origin Access Control, which keeps this site\'s bucket private, now signs requests to multi-Region origins too (August 2026).' },
            { title: 'Stronger private origins', detail: 'VPC origins gained WebSockets and dual-stack IPv6, and viewer mutual TLS gained a passthrough mode (May to October 2026).' },
            { title: 'Self-service quotas', detail: 'View and raise 28 CloudFront quotas through AWS Service Quotas (November 2026).' },
          ],
          source: { label: 'AWS What\'s New: CloudFront cache tag invalidation', url: 'https://aws.amazon.com/about-aws/whats-new/2026/04/cloudfront-invalidation-cache-tag/' },
        },
      },
      {
        slug: 'amazon-s3', name: 'Amazon S3', icon: 'storage', description: 'Object storage',
        usage: 'Holds the built UI files in a private bucket that only CloudFront can read, and stages the API package for Lambda deployments.',
        latest: {
          version: 'Recent launches', released: 'S3 turned 20 in March 2026',
          summary: 'At twenty, S3 is still adding fundamentals, from guaranteed bucket names to file-system access and AI-ready metadata.',
          highlights: [
            { title: 'Account regional namespaces', detail: 'Create buckets under your own account suffix, so the names you want are always available (March 2026).' },
            { title: 'S3 Files', detail: 'Mount buckets as file systems on AWS compute with around one-millisecond latency (April 2026).' },
            { title: 'Cheaper storage sooner', detail: 'Objects can move to Standard-IA or One Zone-IA on the day they are created, with no 30-day wait (July 2026).' },
            { title: 'Annotations for AI agents', detail: 'Attach business context to objects so agents and analytics tools can discover data (June 2026).' },
            { title: 'More integrity checks', detail: 'Five more checksum algorithms, including SHA-512 and XXHash, for ten in all (April 2026).' },
          ],
          source: { label: 'AWS What\'s New: S3 account regional namespaces', url: 'https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-s3-account-regional-namespaces/' },
        },
      },
      {
        slug: 'aws-certificate-manager', name: 'AWS Certificate Manager', icon: 'verified_user', description: 'Free TLS certificates',
        usage: 'Issues and auto-renews the certificates for the app and API domains, validated through DNS records in Route 53.',
        latest: {
          version: 'Recent launches', released: 'Through October 2026',
          summary: 'ACM has opened up to the wider certificate ecosystem with ACME, while adapting to shorter certificate lifetimes.',
          highlights: [
            { title: 'ACME support', detail: 'Any ACMEv2 client, such as certbot, can get public certificates from ACM, scoped to allowed domains and IAM roles (June 2026).' },
            { title: 'ACME over PrivateLink', detail: 'Issuance and renewal can stay on the AWS network (October 2026).' },
            { title: 'Shorter-lived certificates', detail: 'Public certificates now last at most 198 days, following the CA/Browser Forum, and ACM renews them automatically as it does for this site (February 2026).' },
            { title: 'Switch email to DNS validation', detail: 'Move an existing certificate to DNS validation without reissuing it, ahead of email validation ending in March 2027.' },
          ],
          source: { label: 'AWS What\'s New: ACM supports ACME', url: 'https://aws.amazon.com/about-aws/whats-new/2026/07/aws-certificate-manager-acme/' },
        },
      },
      {
        slug: 'amazon-route-53', name: 'Amazon Route 53', icon: 'alt_route', description: 'DNS hosting',
        usage: 'Hosts the domain\'s DNS records, with alias records that point the root domain and its api subdomain at CloudFront, which a CNAME cannot do at the root.',
        latest: {
          version: 'Recent launches', released: 'Through November 2026',
          summary: 'Route 53\'s recent launches cover domains, resolver security and multi-account DNS management.',
          highlights: [
            { title: 'More domains to register', detail: 'Ten new top-level domains, including .ai, .bot and .shop (January 2026), and premium domain names (October 2026).' },
            { title: 'Global Resolver', detail: 'Anycast DNS resolution, now generally available, with control over its Regions and DNS views shared between accounts.' },
            { title: 'Smarter DNS Firewall', detail: 'New threat and content categories, and resolved-IP validation for AWS Network Firewall (May and October 2026).' },
            { title: 'Multiple Profiles per VPC', detail: 'Layer several DNS configurations on one VPC, applied in priority order (November 2026).' },
          ],
          source: { label: 'AWS What\'s New: Route 53 multiple Profiles per VPC', url: 'https://aws.amazon.com/about-aws/whats-new/2026/11/route-53-profiles-multiple-per-vpc/' },
        },
      },
      {
        slug: 'amazon-cloudwatch-logs', name: 'Amazon CloudWatch Logs', icon: 'receipt_long', description: 'API logging',
        usage: 'Collects the Lambda function\'s log output, for troubleshooting the API.',
        latest: {
          version: 'Recent launches', released: 'Through November 2026',
          summary: 'CloudWatch Logs has become cheaper to keep and faster to search, with less setup.',
          highlights: [
            { title: 'Intelligent tiering', detail: 'Logs not read for 30 days move to Infrequent Access and after 90 days to Archive Instant Access, automatically (July 2026).' },
            { title: 'Automatic field indexing', detail: 'Logs Insights indexes the fields you filter on, at no extra cost (September 2026).' },
            { title: 'Alarms straight from queries', detail: 'Alert on a Logs Insights query with the surrounding log context, without building a metric filter first (July 2026).' },
            { title: 'Account-level retention', detail: 'One policy sets retention for every log group in an account, or a prefix-matched subset (November 2026).' },
            { title: 'OpenTelemetry over HTTP', detail: 'Send logs to HTTP endpoints, including OTLP, with a bearer token (March 2026).' },
          ],
          source: { label: 'AWS What\'s New: CloudWatch Logs retention policies', url: 'https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-cloudwatch-log-retention/' },
        },
      },
    ],
  },
  {
    label: 'Tools',
    icon: 'build',
    technologies: [
      {
        slug: 'claude', name: 'Claude', icon: 'smart_toy', description: 'AI coding agent by Anthropic',
        usage: 'Generated this application from the angular-app and spring-boot-app agents and templates provided by Adam Combs.',
        latest: {
          version: 'The Claude 5 family', released: 'Current models: Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1',
          usedHere: 'Claude Opus 5.5 in Claude Code',
          summary: 'Claude Code puts Claude to work directly in your terminal, editor and repository, as the agent that built and maintains this site.',
          highlights: [
            { title: 'Works where you work', detail: 'Claude Code runs in the terminal, desktop app, web and IDE extensions, reading and editing a real codebase and running its builds and tests.' },
            { title: 'End to end', detail: 'For this site it researched release notes, wrote the Angular and Spring code, ran the tests, committed, pushed and watched the GitHub Actions deploys.' },
            { title: 'Extensible', detail: 'Skills, hooks, MCP servers and subagents adapt it to a team\'s own tools and conventions.' },
            { title: 'Pick the model for the job', detail: 'Opus for the hardest work, Sonnet for everyday tasks and Haiku for speed.' },
          ],
          source: { label: 'Claude Code (Anthropic)', url: 'https://claude.com/claude-code' },
        },
      },
      {
        slug: 'powershell-scripts', name: 'PowerShell scripts', icon: 'terminal', description: 'Setup, tests, and start-up',
        usage: 'scripts/start-all.ps1 installs dependencies, builds and tests both apps, then starts the API and UI; the create-* and deploy-api scripts set up AWS from project.json, and GitHub Actions deploys each push to main.',
        latest: {
          version: 'PowerShell 7.6 LTS', released: 'v7.6.0 on March 18, 2026 (7.7.0 followed on November 10, 2026)',
          usedHere: 'Windows PowerShell 5.1 locally, PowerShell 7 in GitHub Actions',
          summary: 'PowerShell 7.6 is the current long-term support release, built on .NET 10 and recommended for production automation.',
          highlights: [
            { title: 'Three years of support', detail: 'As an LTS release on .NET 10, 7.6 is supported for three years; 7.4 support ends on November 18, 2026.' },
            { title: 'Side by side with 5.1', detail: 'pwsh installs alongside Windows PowerShell 5.1 (powershell.exe), so scripts like this site\'s run in either.' },
            { title: 'Reliability first', detail: 'Engine fixes, better native command handling and more consistent tab completion.' },
            { title: 'Updated modules', detail: 'Newer PSReadLine for editing and PSResourceGet for installing modules.' },
          ],
          source: { label: 'Announcing PowerShell 7.6 (Microsoft)', url: 'https://devblogs.microsoft.com/powershell/announcing-powershell-7-6/' },
        },
      },
      {
        slug: 'aws-cli', name: 'AWS CLI', icon: 'keyboard', description: 'Command-line access to AWS',
        usage: 'Runs every AWS step in the setup and deploy scripts, from requesting certificates to uploading the UI and publishing new Lambda versions.',
        latest: {
          version: 'AWS CLI 2.40', released: '2.40.1, November 2026', usedHere: 'AWS CLI 2.38',
          summary: 'Version 2 of the CLI ships new service commands almost daily, and recently made signing in far simpler.',
          highlights: [
            { title: 'aws login', detail: 'Sign in with your console credentials and the CLI gets short-lived credentials that rotate every 15 minutes, with no long-term keys on disk (since 2.32).' },
            { title: 'Account access manager', detail: 'Works with aws login for centrally managed IAM role access (2.36 and later).' },
            { title: 'Remote machines too', detail: 'aws login --remote prints a URL and accepts the authorization code, for servers without a browser.' },
            { title: 'Every service, day one', detail: 'New AWS features, like the S3, CloudFront and Lambda launches on these pages, arrive in the CLI as they ship.' },
          ],
          source: { label: 'Login with console credentials (AWS CLI guide)', url: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sign-in.html' },
        },
      },
    ],
  },
];

/** The technology with this slug, and the index of the group it belongs to. */
export function findTechnology(slug: string): { technology: Technology; groupIndex: number } | undefined {
  for (const [groupIndex, group] of TECHNOLOGY_GROUPS.entries()) {
    const technology = group.technologies.find((t) => t.slug === slug);
    if (technology) return { technology, groupIndex };
  }
  return undefined;
}
