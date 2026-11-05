import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { of } from 'rxjs';
import { App } from './app';
import { ApiStatusService } from './api-status/api-status.service';
import { BRIGHTNESS_STORAGE_KEY } from '../theme/theme.service';

describe('App', () => {
  const apiStatus = { status: signal<'checking' | 'up' | 'down'>('checking') };

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme');
    apiStatus.status.set('checking');
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: BreakpointObserver, useValue: { observe: () => of({ matches: true }) } },
        { provide: ApiStatusService, useValue: apiStatus },
        { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } },
      ],
    }).compileComponents();
  });

  it('shows the dashboard without signing in', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-sidenav-container')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('main h1').textContent.trim()).toBe('Welcome!');
    expect(fixture.nativeElement.querySelector('button[aria-label="Profile"]')).toBeNull();
    expect(fixture.nativeElement.textContent).not.toMatch(/sign in|sign out|account/i);
  });

  it('starts with the sidenav closed', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-controls="app-sidenav"]');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('credits the developer in the footer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const credit: HTMLElement = fixture.nativeElement.querySelector('footer.app-footer .app-credit');
    expect(credit.textContent?.trim()).toBe('Developed by Adam Combs');
    expect(credit.querySelector('.app-credit-name')?.textContent).toBe('Adam Combs');
  });

  it('shows the current API health in the footer, not the toolbar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const icon: HTMLElement = fixture.nativeElement.querySelector('footer.app-footer .api-status');
    expect(icon).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-toolbar .api-status')).toBeNull();
    expect(icon.getAttribute('aria-label')).toBe('Checking API status');
    expect(icon.textContent?.trim()).toBe('cloud_queue');

    apiStatus.status.set('up');
    fixture.detectChanges();
    expect(icon.getAttribute('aria-label')).toBe('API is up');
    expect(icon.textContent?.trim()).toBe('cloud_done');

    apiStatus.status.set('down');
    fixture.detectChanges();
    expect(icon.getAttribute('aria-label')).toBe('API is unreachable');
    expect(icon.textContent?.trim()).toBe('cloud_off');
  });

  it('groups technology cards into front-end, back-end, cloud, and tools tabs', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const tabs: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('[role="tab"]'));
    expect(tabs.map((tab) => tab.textContent?.trim())).toEqual(['Front-end', 'Back-end', 'Cloud', 'Tools']);
    const expected = [
      ['Angular', 'Angular Material', 'Angular CDK', 'Angular Signals', 'TypeScript', 'RxJS', 'Sass', 'SVG',
        'Material Icons & Lato', 'Vitest', 'Angular CLI', 'Node.js & npm'],
      ['Java', 'Spring Boot', 'Spring Boot Actuator', 'Swagger UI', 'JUnit', 'Maven', 'Spring Boot DevTools'],
      ['AWS Lambda', 'Amazon CloudFront', 'Amazon S3', 'AWS Certificate Manager', 'Amazon Route 53', 'Amazon CloudWatch Logs'],
      ['Claude', 'PowerShell scripts', 'AWS CLI'],
    ];
    const visibleCards = (label: string): HTMLElement[] => Array.from(
      fixture.nativeElement.querySelectorAll(`section.card-grid[aria-label="${label} technologies"] mat-card`),
    );
    for (const [index, tab] of tabs.entries()) {
      tab.click();
      fixture.detectChanges();
      await fixture.whenStable();
      const label = tab.textContent!.trim();
      const cards = visibleCards(label);
      expect(cards.map((card) => card.querySelector('mat-card-title')?.textContent?.trim())).toEqual(expected[index]);
      cards.forEach((card, cardIndex) => {
        expect(card.style.getPropertyValue('--card-index')).toBe(String(cardIndex));
        expect(card.querySelector('mat-card-content p')?.textContent?.trim().length).toBeGreaterThan(50);
        expect(card.querySelector('mat-card-content')?.textContent).not.toMatch(/cognito|account|sign-in|database/i);
        const logo = card.querySelector<HTMLImageElement>('mat-card-header img.technology-logo');
        const icon = card.querySelector<HTMLElement>('mat-card-header mat-icon.technology-icon');
        expect(Boolean(logo) !== Boolean(icon)).toBe(true);
        if (logo) {
          expect(logo.getAttribute('src')).toMatch(/^logos\/[a-z-]+\.svg$/);
          expect(logo.getAttribute('alt')).toBe('');
        } else {
          expect(icon?.textContent?.trim()).toMatch(/^[a-z_]+$/);
          expect(icon?.getAttribute('aria-hidden')).toBe('true');
        }
      });
    }
    const backEnd = visibleCards('Back-end');
    expect(backEnd).toHaveLength(0);
    const tools = visibleCards('Tools');
    expect(tools[0].querySelector('mat-icon.technology-icon')?.textContent?.trim()).toBe('smart_toy');
    expect(tools[0].querySelector('mat-card-content')?.textContent).toContain('agents and templates provided by Adam Combs');
    expect(tools[1].querySelector('mat-card-content')?.textContent).toContain('scripts/start-all.ps1');
    tabs[2].click();
    fixture.detectChanges();
    await fixture.whenStable();
    const cloud = visibleCards('Cloud');
    expect(cloud[0].querySelector('mat-icon.technology-icon')?.textContent?.trim()).toBe('bolt');
    expect(cloud[4].querySelector('mat-card-content')?.textContent).toContain('alias records');
    tabs[1].click();
    fixture.detectChanges();
    await fixture.whenStable();
    const backEndCards = visibleCards('Back-end');
    expect(backEndCards[2].querySelector('mat-card-content')?.textContent).toContain('health check');
    expect(backEndCards[3].querySelector('img')?.getAttribute('src')).toBe('logos/swagger.svg');
    expect(backEndCards[4].querySelector('img')?.getAttribute('src')).toBe('logos/junit.svg');
  });

  it('selects technology tabs from the side menu', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const navItems: HTMLElement[] = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('mat-nav-list a[mat-list-item]:not(.cards-link)')).slice(1);
    expect(navItems.map((item) => item.querySelector('[matListItemTitle]')?.textContent?.trim()))    .toEqual(['Front-end', 'Back-end', 'Cloud', 'Tools']);
    navItems[2].click();
    fixture.detectChanges();
    await fixture.whenStable();
    const selected = fixture.nativeElement.querySelector('[role="tab"][aria-selected="true"]');
    expect(selected?.textContent?.trim()).toBe('Cloud');
    expect(navItems[2].getAttribute('aria-current')).toBe('page');
    expect(navItems[0].hasAttribute('aria-current')).toBe(false);
    expect(fixture.nativeElement.querySelector('section.card-grid[aria-label="Cloud technologies"]')).not.toBeNull();
  });

  it('links to the Cards site last in the side menu', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const items: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('mat-nav-list a[mat-list-item]'));
    const cards = items[items.length - 1];
    expect(cards.querySelector('[matListItemTitle]')?.textContent?.trim()).toBe('Cards');
    expect(cards.getAttribute('href')).toBe('https://cards.acombs-dev.com/');
    expect(cards.previousElementSibling?.tagName).toBe('MAT-DIVIDER');
  });

  it('toggles the sidenav from the hamburger button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-controls="app-sidenav"]');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes the sidenav from its toolbar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Toggle navigation menu"]');
    toggle.click();
    fixture.detectChanges();
    const close: HTMLButtonElement = fixture.nativeElement.querySelector('mat-sidenav button[aria-label="Close navigation menu"]');
    expect(fixture.nativeElement.querySelector('mat-sidenav mat-toolbar').textContent).toContain('Menu');
    close.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('uses an overlay sidenav on narrow screens', async () => {
    TestBed.overrideProvider(BreakpointObserver, { useValue: { observe: () => of({ matches: false }) } });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const sidenav = fixture.nativeElement.querySelector('mat-sidenav');
    expect(sidenav.classList.contains('mat-drawer-side')).toBe(false);
    expect(sidenav.classList.contains('mat-sidenav-fixed')).toBe(true);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-controls="app-sidenav"]');
    button.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    await vi.waitFor(() => expect(document.activeElement).toBe(sidenav.querySelector('h2')));
  });

  it('hides the slider until the brightness icon is clicked and toggles it closed', () => {
    localStorage.setItem(BRIGHTNESS_STORAGE_KEY, '100');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Adjust brightness"]');
    const control: HTMLElement = fixture.nativeElement.querySelector('.brightness-control');
    expect(toggle.querySelector('mat-icon')?.textContent?.trim()).toBe('light_mode');
    expect(control.hidden).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(control.hidden).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(localStorage.getItem(BRIGHTNESS_STORAGE_KEY)).toBe('100');
    toggle.click();
    fixture.detectChanges();
    expect(control.hidden).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('adjusts brightness from an unlabeled horizontal slider before the theme button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const control: HTMLElement = fixture.nativeElement.querySelector('.brightness-control');
    (control.nextElementSibling as HTMLButtonElement).click();
    fixture.detectChanges();
    const slider: HTMLInputElement = control.querySelector('input[type="range"]')!;
    expect(slider.getAttribute('aria-orientation')).toBe('horizontal');
    expect(slider.getAttribute('aria-label')).toBe('Brightness');
    expect(control.textContent?.trim()).toBe('');
    expect(control.nextElementSibling?.getAttribute('aria-label')).toBe('Adjust brightness');
    for (const level of [0, 25, 50, 75, 100]) {
      slider.value = String(level);
      slider.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(slider.getAttribute('aria-valuetext')).toBe(`${level}% brightness`);
      expect(document.documentElement.getAttribute('data-brightness')).toBe(String(level));
      expect(control.nextElementSibling?.querySelector('mat-icon')?.textContent?.trim())
        .toBe(level < 45 ? 'dark_mode' : 'light_mode');
    }
  });

  it('places a more-options menu last in the toolbar with API docs and About', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const toolbarButtons = fixture.nativeElement.querySelectorAll('.app-content > .app-toolbar > button');
    const more: HTMLButtonElement = toolbarButtons[toolbarButtons.length - 1];
    expect(more.getAttribute('aria-label')).toBe('More options');
    more.click();
    fixture.detectChanges();
    const panel = document.querySelector('.mat-mdc-menu-panel');
    const apiDocs = panel?.querySelector<HTMLAnchorElement>('a[mat-menu-item]');
    expect(apiDocs?.textContent).toContain('API docs');
    expect(apiDocs?.getAttribute('href')).toBe('/swagger-ui.html');
    expect(apiDocs?.getAttribute('target')).toBe('_blank');
    expect(apiDocs?.getAttribute('rel')).toBe('noopener');
    const about = Array.from(panel?.querySelectorAll('button') ?? []).find((item) => item.textContent?.includes('About'));
    about?.click();
    fixture.detectChanges();
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.querySelector('h2')?.textContent).toContain('About');
    expect(dialog?.textContent).not.toMatch(/cognito|sign-in/i);
  });
});
