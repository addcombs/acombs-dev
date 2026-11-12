import { TECHNOLOGY_GROUPS, findTechnology } from './technologies';

describe('TECHNOLOGY_GROUPS', () => {
  const technologies = TECHNOLOGY_GROUPS.flatMap((group) => group.technologies);

  it('gives every technology a unique, URL-safe slug', () => {
    const slugs = technologies.map((technology) => technology.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('describes every technology and the version used, with an official link', () => {
    for (const { name, version, summary, highlights, learnMore } of technologies) {
      expect(version, name).not.toBe('');
      expect(summary.length, name).toBeGreaterThan(60);
      expect(highlights.length, name).toBeGreaterThanOrEqual(4);
      highlights.forEach((highlight) => {
        expect(highlight.title, name).not.toBe('');
        expect(highlight.detail.length, name).toBeGreaterThan(40);
      });
      expect(new Set(highlights.map((highlight) => highlight.title)).size, name).toBe(highlights.length);
      expect(learnMore.url, name).toMatch(/^https:\/\//);
    }
  });

  it('finds a technology and its group by slug', () => {
    expect(findTechnology('angular')?.technology.name).toBe('Angular');
    expect(findTechnology('amazon-route-53')?.groupIndex).toBe(2);
    expect(findTechnology('cobol')).toBeUndefined();
  });
});
