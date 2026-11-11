import { Injectable, signal } from '@angular/core';

/** The dashboard tab shown, shared by the side menu, the dashboard and the technology pages. */
@Injectable({ providedIn: 'root' })
export class TechnologyNavService {
  readonly selectedGroup = signal(0);
}
