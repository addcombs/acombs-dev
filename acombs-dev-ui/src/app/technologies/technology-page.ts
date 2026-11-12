import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { APP_DISPLAY_NAME } from '../main/app-name';
import { findTechnology } from './technologies';
import { TechnologyNavService } from './technology-nav.service';

/** What one technology does and the version this site uses, opened from its dashboard card. */
@Component({
  selector: 'app-technology-page',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './technology-page.html',
  styleUrl: './technology-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyPageComponent {
  /** From the route's :slug, through component input binding. */
  readonly slug = input.required<string>();
  protected readonly found = computed(() => findTechnology(this.slug()));
  private readonly title = inject(Title);
  private readonly nav = inject(TechnologyNavService);

  constructor() {
    effect(() => {
      const found = this.found();
      this.title.setTitle(`${found?.technology.name ?? 'Technology not found'} - ${APP_DISPLAY_NAME}`);
      // Going back, or opening the side menu, lands on this technology's tab.
      if (found) this.nav.selectedGroup.set(found.groupIndex);
    });
  }
}
