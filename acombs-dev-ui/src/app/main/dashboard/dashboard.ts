import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { TECHNOLOGY_GROUPS } from '../../technologies/technologies';
import { TechnologyNavService } from '../../technologies/technology-nav.service';

/** The home page: the technologies in tabs by group, each card opening that technology's page. */
@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, MatTabsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly technologyGroups = TECHNOLOGY_GROUPS;
  protected readonly nav = inject(TechnologyNavService);
}
