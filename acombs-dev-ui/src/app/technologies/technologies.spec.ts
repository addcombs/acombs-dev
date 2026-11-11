import { TECHNOLOGY_GROUPS, findTechnology } from './technologies';

describe('TECHNOLOGY_GROUPS', () => {
  const technologies = TECHNOLOGY_GROUPS.flatMap((group) => group.technologies);

  it('gives every technology a unique, URL-safe slug', () => {
    const slugs = technologies.map((technology) => technology.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('describes the latest release of every technology, with an official source', () => {
    for (const { name, latest } of technologies) {
      expect(latest.version, name).not.toBe('');
      expect(latest.released, name).not.toBe('');
      expect(latest.summary.length, name).toBeGreaterThan(60);
      expect(latest.highlights.length, name).toBeGreaterThanOrEqual(4);
      latest.highlights.forEach((highlight) => {
        expect(highlight.title, name).not.toBe('');
        expect(highlight.detail.length, name).toBeGreaterThan(40);
      });
      expect(new Set(latest.highlights.map((highlight) => highlight.title)).size, name).toBe(latest.highlights.length);
      expect(latest.source.url, name).toMatch(/^https:\/\//);
    }
  });

  it('finds a technology and its group by slug', () => {
    expect(findTechnology('angular')?.technology.name).toBe('Angular');
    expect(findTechnology('amazon-route-53')?.groupIndex).toBe(2);
    expect(findTechnology('cobol')).toBeUndefined();
  });
});
