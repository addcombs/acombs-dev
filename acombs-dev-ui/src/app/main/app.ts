import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';
import { ThemeService } from '../theme/theme.service';
import { ApiStatusService } from './api-status/api-status.service';
import { apiUrl } from '../api-url';
import { APP_DISPLAY_NAME, DEVELOPER_NAME } from './app-name';
import { AboutDialogComponent } from './about/about-dialog';
import { ToolbarBackgroundComponent } from '../theme/toolbar-background';

/** A dashboard card: shows `logo` (a local SVG in public/logos) or, when no licensed logo is bundled, a Material `icon`. */
export interface Technology {
  name: string;
  logo?: string;
  icon?: string;
  description: string;
  usage: string;
}

export interface TechnologyGroup {
  label: string;
  icon: string;
  technologies: Technology[];
}

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatTooltipModule, ToolbarBackgroundComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './brightness-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly appName = APP_DISPLAY_NAME;
  protected readonly developerName = DEVELOPER_NAME;
  protected readonly apiDocsUrl = apiUrl('/swagger-ui.html');
  protected readonly cardsUrl = 'https://cards.acombs-dev.com/';
  protected readonly theme = inject(ThemeService);
  protected readonly apiStatus = inject(ApiStatusService).status;
  protected readonly apiStatusLabel = computed(() => {
    switch (this.apiStatus()) {
      case 'up':
        return 'API is up';
      case 'down':
        return 'API is unreachable';
      default:
        return 'Checking API status';
    }
  });
  protected readonly brightnessOpen = signal(false);
  protected readonly technologyGroups: TechnologyGroup[] = [
    {
      label: 'Front-end',
      icon: 'web',
      technologies: [
        { name: 'Angular', logo: 'logos/angular.svg', description: 'Front-end framework', usage: 'Builds the app screens and keeps the navigation, theme, and API status in sync with application state.' },
        { name: 'Angular Material', logo: 'logos/angularmaterial.svg', description: 'Material Design 3 components and theming', usage: 'Provides the toolbar, navigation drawer, dialogs, cards, buttons, and theme-aware controls; its theme-color schematic generated the palettes from the single #3F51B5 indigo.' },
        { name: 'Angular CDK', logo: 'logos/angularmaterial.svg', description: 'Component Dev Kit behavior primitives', usage: 'Watches screen-size breakpoints so the navigation drawer docks on wide screens and overlays on narrow ones.' },
        { name: 'Angular Signals', logo: 'logos/angular.svg', description: 'Reactive application state', usage: 'Hold the theme brightness, selected tab, drawer state, and API status, so the screens update automatically whenever any of them change.' },
        { name: 'TypeScript', logo: 'logos/typescript.svg', description: 'Typed application code', usage: 'Defines types for the technology cards and services so mistakes can be caught during development.' },
        { name: 'RxJS', logo: 'logos/rxjs.svg', description: 'Reactive HTTP and async handling', usage: 'Handles asynchronous UI events and the repeating API health check.' },
        { name: 'Sass', logo: 'logos/sass.svg', description: 'Theme and component styling', usage: 'Styles the responsive layout and generates colors for the adjustable light-to-dark theme.' },
        { name: 'SVG', icon: 'grid_on', description: 'Inline vector graphics', usage: 'Draws the toolbar\'s pixel mosaic inline, filled with the theme\'s primary and secondary colors so it follows light/dark mode and the brightness slider.' },
        { name: 'Material Icons & Lato', icon: 'font_download', description: 'Icon font and typeface from Google Fonts', usage: 'Loads the Material Icons font used for every icon in the app and the Lato typeface used for its text from Google Fonts.' },
        { name: 'Vitest', logo: 'logos/vitest.svg', description: 'Front-end unit tests', usage: 'Runs the component and service tests in a jsdom browser environment, including the theme controls and the API health indicator.' },
        { name: 'Angular CLI', logo: 'logos/angular.svg', description: 'Front-end build and dev server', usage: 'Builds the production bundle with esbuild, runs the tests, and serves the app locally through a Vite dev server with a proxy to the API.' },
        { name: 'Node.js & npm', logo: 'logos/nodejs.svg', description: 'JavaScript runtime and package manager', usage: 'Runs the Angular CLI and installs the front-end dependencies listed in package.json.' },
      ],
    },
    {
      label: 'Back-end',
      icon: 'dns',
      technologies: [
        { name: 'Java', logo: 'logos/java.svg', description: 'Back-end language', usage: 'Implements the server-side API, ready for endpoints to be added alongside its health check.' },
        { name: 'Spring Boot', logo: 'logos/spring.svg', description: 'REST API', usage: 'Runs the backend, exposes its health endpoint, and loads configuration from environment variables or a local, untracked .env file.' },
        { name: 'Spring Boot Actuator', logo: 'logos/spring.svg', description: 'Health monitoring', usage: 'Exposes the public health check endpoint that drives the API status indicator in the footer, allowing the deployed UI\'s origin through CORS.' },
        { name: 'Swagger UI', logo: 'logos/swagger.svg', description: 'Interactive API documentation via springdoc-openapi', usage: 'Generates OpenAPI docs for any endpoints added under /api, so they can be explored and tried from the browser.' },
        { name: 'JUnit', logo: 'logos/junit.svg', description: 'Back-end unit tests', usage: 'Tests the health endpoint and its cross-origin rules, and the Lambda adapter\'s handling of function URL responses, without deploying.' },
        { name: 'Maven', logo: 'logos/maven.svg', description: 'Back-end build and dependency management', usage: 'Downloads Java dependencies and builds and tests the Spring Boot API.' },
        { name: 'Spring Boot DevTools', logo: 'logos/spring.svg', description: 'Development-time restarts', usage: 'Restarts the API automatically when code changes during development; it is excluded from production builds.' },
      ],
    },
    {
      label: 'Cloud',
      icon: 'cloud',
      technologies: [
        { name: 'AWS Lambda', icon: 'bolt', description: 'Serverless API hosting', usage: 'Runs the Spring Boot API on Java 21 (arm64) through aws-serverless-java-container, with SnapStart to cut cold starts and a live alias behind a function URL.' },
        { name: 'Amazon CloudFront', icon: 'public', description: 'Content delivery and HTTPS', usage: 'Serves the UI at the app domain and the API at its api subdomain over HTTPS, caching the UI files and passing API requests straight to Lambda.' },
        { name: 'Amazon S3', icon: 'storage', description: 'Object storage', usage: 'Holds the built UI files in a private bucket that only CloudFront can read, and stages the API package for Lambda deployments.' },
        { name: 'AWS Certificate Manager', icon: 'verified_user', description: 'Free TLS certificates', usage: 'Issues and auto-renews the certificates for the app and API domains, validated through DNS records in Route 53.' },
        { name: 'Amazon Route 53', icon: 'alt_route', description: 'DNS hosting', usage: 'Hosts the domain\'s DNS records, with alias records that point the root domain and its api subdomain at CloudFront, which a CNAME cannot do at the root.' },
        { name: 'Amazon CloudWatch Logs', icon: 'receipt_long', description: 'API logging', usage: 'Collects the Lambda function\'s log output; scripts/api-logs.ps1 shows recent API logs for troubleshooting.' },
      ],
    },
    {
      label: 'Tools',
      icon: 'build',
      technologies: [
        { name: 'Claude', icon: 'smart_toy', description: 'AI coding agent by Anthropic', usage: 'Generated this application from the angular-app and spring-boot-app agents and templates provided by Adam Combs.' },
        { name: 'PowerShell scripts', icon: 'terminal', description: 'Setup, tests, start-up, and deployment', usage: 'scripts/start-all.ps1 installs dependencies, builds and tests both apps, then starts the API and UI; scripts/test-all.ps1 reruns the UI tests and API build; the create-*, deploy-api, and deploy-ui scripts set up and deploy to AWS from project.json.' },
        { name: 'AWS CLI', icon: 'keyboard', description: 'Command-line access to AWS', usage: 'Runs every AWS step in the setup and deploy scripts, from requesting certificates to uploading the UI and publishing new Lambda versions.' },
      ],
    },
  ];
  protected readonly selectedTechnologyGroup = signal(0);
  private readonly dialog = inject(MatDialog);

  /** Side mode on wide screens; dismissible overlay on narrow screens. */
  protected readonly isWide = toSignal(
    inject(BreakpointObserver)
      .observe('(min-width: 960px)')
      .pipe(map((state) => state.matches)),
    { initialValue: true },
  );

  protected readonly sidenavOpened = signal(false);

  protected toggleSidenav(): void {
    this.sidenavOpened.update((opened) => !opened);
  }

  protected showTechnologyGroup(index: number): void {
    this.selectedTechnologyGroup.set(index);
    if (!this.isWide()) this.sidenavOpened.set(false);
  }

  protected openAbout(): void {
    this.dialog.open(AboutDialogComponent, { width: '420px', maxWidth: 'calc(100vw - 32px)' });
  }

}
