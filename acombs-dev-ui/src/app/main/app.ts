import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { ThemeService } from '../theme/theme.service';
import { ApiStatusService } from './api-status/api-status.service';
import { apiUrl } from '../api-url';
import { APP_DISPLAY_NAME, DEVELOPER_NAME } from './app-name';
import { AboutDialogComponent } from './about/about-dialog';
import { ToolbarBackgroundComponent } from '../theme/toolbar-background';
import { TECHNOLOGY_GROUPS } from '../technologies/technologies';
import { TechnologyNavService } from '../technologies/technology-nav.service';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, RouterOutlet, ToolbarBackgroundComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './brightness-control.scss', './toolbar.scss'],
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
  protected readonly technologyGroups = TECHNOLOGY_GROUPS;
  protected readonly nav = inject(TechnologyNavService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly content = viewChild.required(MatSidenavContent);

  /** Side mode on wide screens; dismissible overlay on narrow screens. */
  protected readonly isWide = toSignal(
    inject(BreakpointObserver)
      .observe('(min-width: 960px)')
      .pipe(map((state) => state.matches)),
    { initialValue: true },
  );

  protected readonly sidenavOpened = signal(false);

  constructor() {
    // The page scrolls inside the sidenav content, not the window, so each new page starts at its top there.
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.content().scrollTo({ top: 0 }));
  }

  protected toggleSidenav(): void {
    this.sidenavOpened.update((opened) => !opened);
  }

  /** Shows the group's tab on the dashboard, coming back to it from a technology's page. */
  protected showTechnologyGroup(index: number): void {
    this.nav.selectedGroup.set(index);
    void this.router.navigateByUrl('/');
    if (!this.isWide()) this.sidenavOpened.set(false);
  }

  protected openAbout(): void {
    this.dialog.open(AboutDialogComponent, { width: '420px', maxWidth: 'calc(100vw - 32px)' });
  }

}
