/** One reason to like a technology. */
export interface Highlight {
  title: string;
  detail: string;
}

/** A dashboard card and its page: shows `logo` (a local SVG in public/logos) or, when no licensed logo is bundled, a Material `icon`. */
export interface Technology {
  slug: string;
  name: string;
  logo?: string;
  icon?: string;
  description: string;
  usage: string;
  /** The version this site uses; managed cloud services have none, so theirs says so. */
  version: string;
  /** What the technology is, in a sentence or two. */
  summary: string;
  highlights: Highlight[];
  /** The technology's official documentation or home page. */
  learnMore: { label: string; url: string };
}

export interface TechnologyGroup {
  label: string;
  icon: string;
  technologies: Technology[];
}

const AWS_MANAGED = 'Fully managed by AWS';

export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    label: 'Front-end',
    icon: 'web',
    technologies: [
      {
        slug: 'angular', name: 'Angular', logo: 'logos/angular.svg', description: 'Front-end framework',
        usage: 'Builds the app screens and keeps the navigation, theme, and API status in sync with application state.',
        version: 'Angular 21.2',
        summary: 'Angular is Google\'s open-source framework for building web applications in TypeScript, with everything a large app needs (components, routing, forms, HTTP and testing) designed to work together.',
        highlights: [
          { title: 'Batteries included', detail: 'Routing, forms, an HTTP client, internationalization and testing tools ship with the framework, so there is one well-supported way to do each.' },
          { title: 'Standalone components', detail: 'Each component declares exactly what it imports, which keeps features self-contained and easy to lazy-load, as this site does for these pages.' },
          { title: 'Fine-grained reactivity', detail: 'Signals tell Angular exactly what changed, so it updates only the affected parts of the page.' },
          { title: 'Built-in control flow', detail: 'Template syntax such as @if, @for and @let reads like code and is type-checked by the compiler.' },
          { title: 'Predictable upgrades', detail: 'A major release every six months, with long-term support and ng update migrations that rewrite code for you.' },
        ],
        learnMore: { label: 'angular.dev', url: 'https://angular.dev/overview' },
      },
      {
        slug: 'angular-material', name: 'Angular Material', logo: 'logos/angularmaterial.svg', description: 'Material Design 3 components and theming',
        usage: 'Provides the toolbar, navigation drawer, dialogs, cards, buttons, and theme-aware controls; its theme-color schematic generated the palettes from the single #3F51B5 indigo.',
        version: 'Angular Material 21.2',
        summary: 'Angular Material is the Angular team\'s library of UI components that implement Google\'s Material Design, built and released alongside the framework itself.',
        highlights: [
          { title: 'Ready-made components', detail: 'Buttons, cards, tabs, dialogs, menus, form fields, tables and more, all consistent with each other and with Material Design.' },
          { title: 'Theming from one colour', detail: 'mat.theme turns a single brand colour into full tonal palettes, exposed as --mat-sys-* CSS variables, as this site does from #3F51B5.' },
          { title: 'Light and dark from the same theme', detail: 'The system tokens resolve per colour scheme, so components follow light and dark mode without separate stylesheets.' },
          { title: 'Accessible by default', detail: 'Keyboard support, focus management and ARIA attributes are built into every component.' },
        ],
        learnMore: { label: 'material.angular.dev', url: 'https://material.angular.dev/' },
      },
      {
        slug: 'angular-cdk', name: 'Angular CDK', logo: 'logos/angularmaterial.svg', description: 'Component Dev Kit behavior primitives',
        usage: 'Watches screen-size breakpoints so the navigation drawer docks on wide screens and overlays on narrow ones.',
        version: 'Angular CDK 21.2',
        summary: 'The Component Dev Kit is the unstyled foundation under Angular Material: tested behaviour without any look, for building components of your own.',
        highlights: [
          { title: 'Behaviour without styling', detail: 'Use the same building blocks as Angular Material while keeping complete control over how things look.' },
          { title: 'Layout and breakpoints', detail: 'BreakpointObserver reports media-query matches as observables, which this site turns into a signal to switch the drawer between side and overlay modes.' },
          { title: 'Overlays, drag and drop, virtual scrolling', detail: 'Positioned overlays, sortable drag and drop and virtual scrolling for long lists, all without importing a single Material style.' },
          { title: 'Accessibility utilities', detail: 'Focus traps, live announcers, list key managers and the cdk-visually-hidden class this site uses for screen-reader-only text.' },
        ],
        learnMore: { label: 'Component Dev Kit (material.angular.dev)', url: 'https://material.angular.dev/cdk/categories' },
      },
      {
        slug: 'angular-signals', name: 'Angular Signals', logo: 'logos/angular.svg', description: 'Reactive application state',
        usage: 'Hold the theme brightness, selected tab, drawer state, and API status, so the screens update automatically whenever any of them change.',
        version: 'Angular 21.2',
        summary: 'A signal is a value that tells Angular when it changes. Templates and computed values that read a signal update automatically, and only where needed.',
        highlights: [
          { title: 'Simple to read and write', detail: 'Call a signal to read it, and set or update it to change it; no subscriptions to manage or clean up.' },
          { title: 'Derived state with computed', detail: 'computed values recalculate only when the signals they read change, and cache their result in between.' },
          { title: 'Precise updates', detail: 'Angular knows exactly which views read a changed signal, which makes the efficient OnPush change detection used throughout this site effortless.' },
          { title: 'Effects for side effects', detail: 'effect runs code whenever its signals change, as these pages do to set the browser tab\'s title.' },
          { title: 'Works with RxJS', detail: 'toSignal and toObservable bridge signals and observables, so both styles fit in one app.' },
        ],
        learnMore: { label: 'Signals guide (angular.dev)', url: 'https://angular.dev/guide/signals' },
      },
      {
        slug: 'typescript', name: 'TypeScript', logo: 'logos/typescript.svg', description: 'Typed application code',
        usage: 'Defines types for the technology cards and services so mistakes can be caught during development.',
        version: 'TypeScript 5.9',
        summary: 'TypeScript is JavaScript with types. Microsoft\'s open-source language checks code as you write it, then compiles to plain JavaScript that runs anywhere.',
        highlights: [
          { title: 'Catches mistakes early', detail: 'Typos, missing properties and wrong arguments show up in the editor, long before anyone loads the page.' },
          { title: 'Better editor help', detail: 'Types power autocomplete, inline documentation, go-to-definition and safe renames across a whole project.' },
          { title: 'Types you rarely write', detail: 'Inference works out most types on its own, so code stays close to plain JavaScript.' },
          { title: 'Just JavaScript underneath', detail: 'Any JavaScript is already valid TypeScript, so projects can adopt it gradually and use any npm package.' },
          { title: 'Expressive type system', detail: 'Unions, generics and mapped types describe real-world data precisely, like the Technology type behind these pages.' },
        ],
        learnMore: { label: 'typescriptlang.org', url: 'https://www.typescriptlang.org/' },
      },
      {
        slug: 'rxjs', name: 'RxJS', logo: 'logos/rxjs.svg', description: 'Reactive HTTP and async handling',
        usage: 'Handles asynchronous UI events and the repeating API health check.',
        version: 'RxJS 7.8',
        summary: 'RxJS is a library for working with streams of events over time, called observables, such as clicks, timers and HTTP responses.',
        highlights: [
          { title: 'Async as data', detail: 'Events, timers and requests all become observables that can be combined, filtered and transformed the same way.' },
          { title: 'A rich operator toolkit', detail: 'Operators like map, filter, switchMap and retry express complex timing, such as the five-minute health check, in a few lines.' },
          { title: 'Cancellation built in', detail: 'Unsubscribing stops the work, and operators like switchMap cancel stale requests automatically.' },
          { title: 'Part of Angular\'s foundations', detail: 'Angular\'s HTTP client, router and CDK all speak observables.' },
        ],
        learnMore: { label: 'rxjs.dev', url: 'https://rxjs.dev/guide/overview' },
      },
      {
        slug: 'sass', name: 'Sass', logo: 'logos/sass.svg', description: 'Theme and component styling',
        usage: 'Styles the responsive layout and generates colors for the adjustable light-to-dark theme.',
        version: 'Dart Sass 1.97',
        summary: 'Sass is a stylesheet language that compiles to CSS, adding variables, functions, mixins and modules that keep large stylesheets organized.',
        highlights: [
          { title: 'Reusable styles', detail: 'Mixins and functions package up patterns once, like Angular Material\'s mat.theme that this site uses for its whole theme.' },
          { title: 'Modules', detail: '@use loads styles with their own namespace, so libraries and app styles never clash.' },
          { title: 'Calculations at build time', detail: 'Colour, math and list functions do the work during the build, so the browser receives plain CSS.' },
          { title: 'Nesting', detail: 'Rules can sit inside their parents, so a component\'s styles read in the same shape as its markup.' },
          { title: 'Fully CSS-compatible', detail: 'Any valid CSS is valid SCSS, so it works alongside modern CSS features such as custom properties.' },
        ],
        learnMore: { label: 'sass-lang.com', url: 'https://sass-lang.com/guide/' },
      },
      {
        slug: 'svg', name: 'SVG', icon: 'grid_on', description: 'Inline vector graphics',
        usage: 'Draws the toolbar\'s pixel mosaic inline, filled with the theme\'s primary and secondary colors so it follows light/dark mode and the brightness slider.',
        version: 'Inline SVG in HTML',
        summary: 'Scalable Vector Graphics is the web\'s standard format for drawings made of shapes and paths, which stay sharp at any size.',
        highlights: [
          { title: 'Sharp at every size', detail: 'Shapes are described mathematically, so they look crisp on any screen, from phones to 4K monitors.' },
          { title: 'Styled with CSS', detail: 'Fills and strokes can use CSS variables, which is how the toolbar mosaic and the logo follow the theme.' },
          { title: 'Small and text-based', detail: 'Simple graphics are often tinier than images, compress well and can be written right into the page.' },
          { title: 'Part of the page', detail: 'Inline SVG is part of the DOM, so it can be scripted, animated and given accessible labels.' },
        ],
        learnMore: { label: 'SVG (MDN Web Docs)', url: 'https://developer.mozilla.org/en-US/docs/Web/SVG' },
      },
      {
        slug: 'material-icons-and-lato', name: 'Material Icons & Lato', icon: 'font_download', description: 'Icon font and typeface from Google Fonts',
        usage: 'Loads the Material Icons font used for every icon in the app and the Lato typeface used for its text from Google Fonts.',
        version: 'Material Icons (classic) and Lato',
        summary: 'Material Icons is Google\'s open-source icon set, delivered as a font, and Lato is a warm, friendly sans-serif typeface; both are served free from Google Fonts.',
        highlights: [
          { title: 'Icons by name', detail: 'An icon is just a word, like menu or arrow_forward, inside a mat-icon; the font\'s ligatures turn it into the glyph.' },
          { title: 'Thousands of icons', detail: 'A large, consistent set covers everyday interface needs, all in the same visual style.' },
          { title: 'Behave like text', detail: 'Font icons take their size and colour from CSS, so they follow the theme like the words around them.' },
          { title: 'A readable typeface', detail: 'Lato\'s semi-rounded letters stay clear at small sizes and come in a full range of weights.' },
          { title: 'Open licences', detail: 'Material Icons is Apache 2.0 and Lato is under the SIL Open Font License, both free to use anywhere.' },
        ],
        learnMore: { label: 'Material Icons guide (Google Fonts)', url: 'https://developers.google.com/fonts/docs/material_icons' },
      },
      {
        slug: 'vitest', name: 'Vitest', logo: 'logos/vitest.svg', description: 'Front-end unit tests',
        usage: 'Runs the component and service tests in a jsdom browser environment, including the theme controls and the API health indicator.',
        version: 'Vitest 4.1',
        summary: 'Vitest is a fast, modern test runner from the Vite ecosystem, and the Angular CLI\'s built-in choice for unit tests.',
        highlights: [
          { title: 'Fast feedback', detail: 'Tests run in parallel, and watch mode re-runs only those affected by a change.' },
          { title: 'Familiar API', detail: 'describe, it and expect work like Jest, so tests are easy to read and to move between projects.' },
          { title: 'Browser-like environments', detail: 'jsdom simulates the DOM, as here, and browser mode can run the same tests in real browsers.' },
          { title: 'Batteries included', detail: 'Mocks, spies, fake timers, snapshots and code coverage come built in.' },
        ],
        learnMore: { label: 'vitest.dev', url: 'https://vitest.dev/guide/' },
      },
      {
        slug: 'angular-cli', name: 'Angular CLI', logo: 'logos/angular.svg', description: 'Front-end build and dev server',
        usage: 'Builds the production bundle with esbuild, runs the tests, and serves the app locally through a Vite dev server with a proxy to the API.',
        version: 'Angular CLI 21.2',
        summary: 'The Angular CLI is the command-line tool that creates, builds, serves, tests and updates Angular apps.',
        highlights: [
          { title: 'One tool for the whole workflow', detail: 'ng new, ng serve, ng build, ng test and ng generate cover everything from first file to production bundle.' },
          { title: 'Fast builds', detail: 'esbuild compiles the app and Vite serves it in development, with instant reloads.' },
          { title: 'Optimized for production', detail: 'Production builds are minified, tree-shaken and split into lazy chunks, and warn when they grow past a budget.' },
          { title: 'Automated upgrades', detail: 'ng update upgrades Angular and runs migrations that rewrite code for new APIs.' },
          { title: 'Schematics', detail: 'Generators scaffold components, services and more, like the theme-color schematic that made this site\'s palette.' },
        ],
        learnMore: { label: 'Angular CLI overview (angular.dev)', url: 'https://angular.dev/tools/cli' },
      },
      {
        slug: 'nodejs-and-npm', name: 'Node.js & npm', logo: 'logos/nodejs.svg', description: 'JavaScript runtime and package manager',
        usage: 'Runs the Angular CLI and installs the front-end dependencies listed in package.json.',
        version: 'Node.js 24 LTS',
        summary: 'Node.js runs JavaScript outside the browser, and npm, which comes with it, installs packages from the world\'s largest software registry.',
        highlights: [
          { title: 'Powers front-end tooling', detail: 'Build tools, dev servers and test runners, the Angular CLI among them, all run on Node.js.' },
          { title: 'A huge ecosystem', detail: 'The npm registry hosts millions of open-source packages, from frameworks to small utilities.' },
          { title: 'Reproducible installs', detail: 'package-lock.json pins every dependency, so npm ci installs exactly the same versions locally and in CI.' },
          { title: 'Long-term support', detail: 'Even-numbered releases become LTS versions, with years of security and stability fixes.' },
        ],
        learnMore: { label: 'nodejs.org', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
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
        version: 'Java 21 LTS',
        summary: 'Java is a mature, strongly typed language that runs on the Java Virtual Machine, and one of the most widely used languages for back-end services.',
        highlights: [
          { title: 'Write once, run anywhere', detail: 'Compiled bytecode runs on any JVM, on any operating system or processor, including the arm64 Lambda this API runs on.' },
          { title: 'Fast and well tuned', detail: 'Just-in-time compilation and modern garbage collectors make long-running services fast.' },
          { title: 'Modern language features', detail: 'Records, pattern matching, switch expressions and virtual threads keep code concise.' },
          { title: 'Huge ecosystem', detail: 'Decades of libraries and frameworks, Spring among them, cover nearly any back-end need.' },
          { title: 'Long-term support', detail: 'An LTS release arrives every two years with years of updates, which is why this API targets Java 21.' },
        ],
        learnMore: { label: 'dev.java', url: 'https://dev.java/learn/' },
      },
      {
        slug: 'spring-boot', name: 'Spring Boot', logo: 'logos/spring.svg', description: 'REST API',
        usage: 'Runs the backend, exposes its health endpoint, and loads configuration from environment variables or a local, untracked .env file.',
        version: 'Spring Boot 3.5',
        summary: 'Spring Boot makes it quick to build production-ready Java services with the Spring Framework, through sensible defaults and automatic configuration.',
        highlights: [
          { title: 'Auto-configuration', detail: 'Add a starter dependency and Spring Boot configures it, so a web API needs almost no setup code.' },
          { title: 'Production-ready', detail: 'Health checks, metrics, externalized configuration and structured logging are built in.' },
          { title: 'Dependency injection', detail: 'Spring wires components together, which keeps code loosely coupled and easy to test.' },
          { title: 'Flexible configuration', detail: 'Properties come from files, environment variables or the command line, with profiles for each environment.' },
          { title: 'Runs anywhere', detail: 'The same app runs as an executable jar, in a container or, as here, on AWS Lambda.' },
        ],
        learnMore: { label: 'spring.io/projects/spring-boot', url: 'https://spring.io/projects/spring-boot' },
      },
      {
        slug: 'spring-boot-actuator', name: 'Spring Boot Actuator', logo: 'logos/spring.svg', description: 'Health monitoring',
        usage: 'Exposes the public health check endpoint that drives the API status indicator in the footer, allowing the deployed UI\'s origin through CORS.',
        version: 'Spring Boot 3.5',
        summary: 'Actuator adds production endpoints to a Spring Boot app, for checking its health and seeing what it is doing.',
        highlights: [
          { title: 'Health checks', detail: '/actuator/health reports whether the app and its dependencies are working, which the footer\'s status icon polls.' },
          { title: 'Metrics', detail: 'Micrometer metrics for requests, memory and more, exportable to monitoring systems such as CloudWatch.' },
          { title: 'Insight into the app', detail: 'Endpoints can list configuration, beans, mappings and log levels, and change log levels at run time.' },
          { title: 'Secure by default', detail: 'Only health is exposed over HTTP unless you choose to expose more.' },
        ],
        learnMore: { label: 'Actuator reference (Spring Boot)', url: 'https://docs.spring.io/spring-boot/reference/actuator/index.html' },
      },
      {
        slug: 'swagger-ui', name: 'Swagger UI', logo: 'logos/swagger.svg', description: 'Interactive API documentation via springdoc-openapi',
        usage: 'Generates OpenAPI docs for any endpoints added under /api, so they can be explored and tried from the browser.',
        version: 'springdoc-openapi 2.10',
        summary: 'Swagger UI turns an OpenAPI description into interactive documentation, and springdoc-openapi generates that description straight from Spring code.',
        highlights: [
          { title: 'Docs from code', detail: 'springdoc reads controllers, parameters and models, so the documentation always matches the API.' },
          { title: 'Try it in the browser', detail: 'Every endpoint can be called from the page, with example requests and live responses.' },
          { title: 'An open standard', detail: 'The OpenAPI document at /v3/api-docs works with code generators, testing tools and API gateways.' },
          { title: 'Zero setup', detail: 'One Maven dependency adds both the OpenAPI document and the Swagger UI page.' },
        ],
        learnMore: { label: 'springdoc.org', url: 'https://springdoc.org/' },
      },
      {
        slug: 'junit', name: 'JUnit', logo: 'logos/junit.svg', description: 'Back-end unit tests',
        usage: 'Tests the health endpoint and its cross-origin rules, and the Lambda adapter\'s handling of function URL responses, without deploying.',
        version: 'JUnit 5.12 (managed by Spring Boot 3.5)',
        summary: 'JUnit is the standard testing framework for Java, used by nearly every Java project and supported by every Java build tool and IDE.',
        highlights: [
          { title: 'Clear, simple tests', detail: 'Annotate a method with @Test and use assertions; descriptive names make results easy to read.' },
          { title: 'Parameterized tests', detail: 'Run one test against many inputs, from values, CSV rows or methods.' },
          { title: 'Extensible', detail: 'The extension model lets frameworks such as Spring plug in, so tests can start part of an app or mock its parts.' },
          { title: 'Supported everywhere', detail: 'Maven, Gradle, IntelliJ, Eclipse and VS Code all run and report JUnit tests.' },
        ],
        learnMore: { label: 'JUnit user guide', url: 'https://docs.junit.org/current/user-guide/' },
      },
      {
        slug: 'maven', name: 'Maven', logo: 'logos/maven.svg', description: 'Back-end build and dependency management',
        usage: 'Downloads Java dependencies and builds and tests the Spring Boot API.',
        version: 'Maven 3.10',
        summary: 'Apache Maven builds Java projects and manages their dependencies, from a single pom.xml that describes the project.',
        highlights: [
          { title: 'Dependency management', detail: 'Declare a library and Maven downloads it, along with everything it depends on, from Maven Central.' },
          { title: 'A standard lifecycle', detail: 'compile, test, package and install work the same way in every Maven project.' },
          { title: 'Convention over configuration', detail: 'A standard folder layout means most projects need very little build configuration.' },
          { title: 'Plugins and profiles', detail: 'Plugins extend the build, and profiles switch it per target, like this API\'s lambda profile that packages a zip for Lambda.' },
        ],
        learnMore: { label: 'maven.apache.org', url: 'https://maven.apache.org/what-is-maven.html' },
      },
      {
        slug: 'spring-boot-devtools', name: 'Spring Boot DevTools', logo: 'logos/spring.svg', description: 'Development-time restarts',
        usage: 'Restarts the API automatically when code changes during development; it is excluded from production builds.',
        version: 'Spring Boot 3.5',
        summary: 'DevTools speeds up development of Spring Boot apps by restarting them automatically and applying development-friendly settings.',
        highlights: [
          { title: 'Automatic restarts', detail: 'When compiled classes change, the app restarts in a moment, keeping dependencies loaded to stay fast.' },
          { title: 'LiveReload', detail: 'Browsers with a LiveReload extension refresh as soon as resources change.' },
          { title: 'Development defaults', detail: 'Turns off template caching and turns on helpful logging while you work.' },
          { title: 'Never in production', detail: 'DevTools switches itself off in packaged apps and is left out of production builds.' },
        ],
        learnMore: { label: 'DevTools reference (Spring Boot)', url: 'https://docs.spring.io/spring-boot/reference/using/devtools.html' },
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
        version: 'Java 21 runtime on arm64',
        summary: 'AWS Lambda runs code without servers to manage: it starts the code when a request or event arrives and scales it automatically.',
        highlights: [
          { title: 'No servers to manage', detail: 'AWS handles the machines, operating system, patching and scaling.' },
          { title: 'Pay per use', detail: 'Billing is per request and per millisecond of run time, so a quiet API costs almost nothing.' },
          { title: 'Scales automatically', detail: 'From zero to thousands of concurrent requests, with no capacity planning.' },
          { title: 'SnapStart', detail: 'Lambda snapshots an initialized function and resumes from it, cutting Java cold starts dramatically.' },
          { title: 'Function URLs', detail: 'A built-in HTTPS endpoint for a function, with no API gateway required.' },
        ],
        learnMore: { label: 'AWS Lambda Developer Guide', url: 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html' },
      },
      {
        slug: 'amazon-cloudfront', name: 'Amazon CloudFront', icon: 'public', description: 'Content delivery and HTTPS',
        usage: 'Serves the UI at the app domain and the API at its api subdomain over HTTPS, caching the UI files and passing API requests straight to Lambda.',
        version: AWS_MANAGED,
        summary: 'Amazon CloudFront is AWS\'s content delivery network, serving websites and APIs from hundreds of locations close to visitors.',
        highlights: [
          { title: 'Fast everywhere', detail: 'Content is cached at edge locations around the world, so pages load quickly wherever visitors are.' },
          { title: 'HTTPS with your domain', detail: 'Free certificates from AWS Certificate Manager serve the site securely at its own domain.' },
          { title: 'Private origins', detail: 'Origin access control lets CloudFront read a private S3 bucket that nobody can reach directly.' },
          { title: 'Built-in protection', detail: 'AWS Shield Standard defends against common network attacks at no extra cost.' },
        ],
        learnMore: { label: 'Amazon CloudFront Developer Guide', url: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html' },
      },
      {
        slug: 'amazon-s3', name: 'Amazon S3', icon: 'storage', description: 'Object storage',
        usage: 'Holds the built UI files in a private bucket that only CloudFront can read, and stages the API package for Lambda deployments.',
        version: AWS_MANAGED,
        summary: 'Amazon Simple Storage Service stores any amount of data as objects in buckets, and is one of AWS\'s oldest and most widely used services.',
        highlights: [
          { title: 'Extremely durable', detail: 'S3 is designed for 99.999999999% durability, keeping copies across multiple facilities.' },
          { title: 'Unlimited scale', detail: 'Store anything from a few small files to petabytes, with no capacity to plan.' },
          { title: 'Private by default', detail: 'New buckets block public access, and policies grant exactly the access each service needs.' },
          { title: 'Storage classes', detail: 'Cheaper tiers for rarely used data, and lifecycle rules that move objects between them automatically.' },
        ],
        learnMore: { label: 'Amazon S3 User Guide', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html' },
      },
      {
        slug: 'aws-certificate-manager', name: 'AWS Certificate Manager', icon: 'verified_user', description: 'Free TLS certificates',
        usage: 'Issues and auto-renews the certificates for the app and API domains, validated through DNS records in Route 53.',
        version: AWS_MANAGED,
        summary: 'AWS Certificate Manager issues and manages the TLS certificates that let websites and APIs use HTTPS.',
        highlights: [
          { title: 'Free public certificates', detail: 'Certificates used with services like CloudFront cost nothing.' },
          { title: 'Automatic renewal', detail: 'With DNS validation, ACM renews certificates before they expire, with nothing to do by hand.' },
          { title: 'Keys stay safe', detail: 'Private keys are managed by AWS and never leave its services.' },
          { title: 'Integrated', detail: 'Attach a certificate to CloudFront, load balancers or API Gateway in a few clicks or one CLI call.' },
        ],
        learnMore: { label: 'AWS Certificate Manager User Guide', url: 'https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html' },
      },
      {
        slug: 'amazon-route-53', name: 'Amazon Route 53', icon: 'alt_route', description: 'DNS hosting',
        usage: 'Hosts the domain\'s DNS records, with alias records that point the root domain and its api subdomain at CloudFront, which a CNAME cannot do at the root.',
        version: AWS_MANAGED,
        summary: 'Amazon Route 53 is AWS\'s highly available DNS service, translating domain names like acombs-dev.com into the addresses that serve them.',
        highlights: [
          { title: 'Highly available', detail: 'Answers come from a global network of DNS servers, backed by a 100% availability service level agreement.' },
          { title: 'Alias records', detail: 'Point a domain, even the bare root domain, straight at AWS resources such as CloudFront.' },
          { title: 'Domain registration', detail: 'Buy and renew domains in the same place their DNS is hosted.' },
          { title: 'Smart routing', detail: 'Health checks and routing policies can send visitors to the nearest or healthiest endpoint.' },
        ],
        learnMore: { label: 'Amazon Route 53 Developer Guide', url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html' },
      },
      {
        slug: 'amazon-cloudwatch-logs', name: 'Amazon CloudWatch Logs', icon: 'receipt_long', description: 'API logging',
        usage: 'Collects the Lambda function\'s log output, for troubleshooting the API.',
        version: AWS_MANAGED,
        summary: 'Amazon CloudWatch Logs collects, stores and searches log output from AWS services and applications in one place.',
        highlights: [
          { title: 'Automatic for Lambda', detail: 'Everything a function writes to its output lands in a log group, with no agent to install.' },
          { title: 'Powerful search', detail: 'Logs Insights queries filter, aggregate and chart millions of log lines in seconds.' },
          { title: 'Live tail', detail: 'Watch logs stream in as they happen, from the console or aws logs tail.' },
          { title: 'Retention and alarms', detail: 'Choose how long to keep logs, and turn log patterns into metrics and alarms.' },
        ],
        learnMore: { label: 'Amazon CloudWatch Logs User Guide', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html' },
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
        version: 'Claude Opus 5.5 in Claude Code',
        summary: 'Claude is Anthropic\'s AI model, and Claude Code puts it to work as a coding agent that reads, writes, tests and ships code alongside a developer.',
        highlights: [
          { title: 'Works in the real project', detail: 'Claude Code reads the codebase, edits files and runs builds, tests and git, rather than only suggesting snippets.' },
          { title: 'Plans and follows through', detail: 'It breaks a request into steps, carries them out, checks the results and fixes what fails.' },
          { title: 'Follows your conventions', detail: 'Agents, templates and project instructions teach it how a team builds things, which is how this site was generated.' },
          { title: 'You stay in control', detail: 'Changes and commands can require approval, and every change lands in git for review.' },
        ],
        learnMore: { label: 'Claude Code (Anthropic)', url: 'https://claude.com/claude-code' },
      },
      {
        slug: 'powershell-scripts', name: 'PowerShell scripts', icon: 'terminal', description: 'Setup, tests, and start-up',
        usage: 'scripts/start-all.ps1 installs dependencies, builds and tests both apps, then starts the API and UI; the create-* and deploy-api scripts set up AWS from project.json, and GitHub Actions deploys each push to main.',
        version: 'Windows PowerShell 5.1 locally, PowerShell 7 in GitHub Actions',
        summary: 'PowerShell is Microsoft\'s cross-platform shell and scripting language, built on .NET, for automating tasks on Windows, Linux and macOS.',
        highlights: [
          { title: 'Objects, not text', detail: 'Commands pass structured objects down the pipeline, so there is no fragile text parsing.' },
          { title: 'Readable commands', detail: 'Verb-Noun names such as Get-ChildItem and Test-Path make scripts easy to follow.' },
          { title: 'Cross-platform', detail: 'PowerShell 7 runs on Windows, Linux and macOS, including GitHub Actions runners.' },
          { title: 'Easy JSON handling', detail: 'ConvertFrom-Json and ConvertTo-Json read and write configuration like this project\'s project.json.' },
        ],
        learnMore: { label: 'PowerShell documentation (Microsoft Learn)', url: 'https://learn.microsoft.com/powershell/scripting/overview' },
      },
      {
        slug: 'aws-cli', name: 'AWS CLI', icon: 'keyboard', description: 'Command-line access to AWS',
        usage: 'Runs every AWS step in the setup and deploy scripts, from requesting certificates to uploading the UI and publishing new Lambda versions.',
        version: 'AWS CLI 2.38',
        summary: 'The AWS Command Line Interface controls every AWS service from a terminal or script.',
        highlights: [
          { title: 'Every service in one tool', detail: 'Hundreds of services share one consistent command structure, and new features arrive as they launch.' },
          { title: 'Made for scripting', detail: 'JSON output and --query filters make results easy to use in scripts like this site\'s deploy steps.' },
          { title: 'Secure sign-in', detail: 'aws login and IAM Identity Center provide short-lived credentials instead of long-term keys.' },
          { title: 'Handy high-level commands', detail: 'Commands such as aws s3 sync upload a whole folder, like the built UI, in one line.' },
        ],
        learnMore: { label: 'AWS CLI User Guide', url: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html' },
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
