import { Service, signal } from '@angular/core';

/** The dashboard tab shown, shared by the side menu, the dashboard and the technology pages. */
@Service()
export class TechnologyNavService {
  readonly selectedGroup = signal(0);
}
