import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const mockAlbumsData = [
    {
      title: { label: 'Equal Strain On All Parts - Jimmy Buffett' },
      category: { attributes: { term: 'Rock' } },
      'im:artist': { label: 'Jimmy Buffett' },
    },
    {
      title: { label: 'Another Album Title - Another Artist' },
      category: { attributes: { term: 'Pop' } },
      'im:artist': { label: 'Another Artist' },
    },
  ];

  const pipe = new FilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if no filter string is provided', () => {
    expect(pipe.transform(mockAlbumsData, '', ['title.label'])).toEqual(
      mockAlbumsData
    );
  });

  it('should return an empty array if the input array is empty', () => {
    expect(pipe.transform([], 'Rock', ['category.attributes.term'])).toEqual(
      []
    );
  });

  it('should return an empty array if no matches found', () => {
    expect(
      pipe.transform(mockAlbumsData, 'Classical', ['category.attributes.term'])
    ).toEqual([]);
  });

  it('should filter by different properties', () => {
    // Filtering by the title property
    let result = pipe.transform(mockAlbumsData, 'Equal Strain', [
      'title.label',
    ]);
    expect(result.length).toBe(1);
    expect(result[0].title.label).toContain('Equal Strain On All Parts');

    // Filtering by the artist property
    result = pipe.transform(mockAlbumsData, 'Jimmy Buffett', [
      'im:artist.label',
    ]);
    expect(result.length).toBe(1);
    expect(result[0]['im:artist'].label).toContain('Jimmy Buffett');

    // Filtering by the category property
    result = pipe.transform(mockAlbumsData, 'Rock', [
      'category.attributes.term',
    ]);
    expect(result.length).toBe(1);
    expect(result[0].category.attributes.term).toBe('Rock');


    // Filtering by a term that appears in title and artist properties
    result = pipe.transform(mockAlbumsData, 'Another', [
      'title.label',
      'im:artist.label',
      'category.attributes.term',
    ]);

    expect(result.length).toBe(1);
    expect(result[0].title.label).toContain('Another Album Title');
    expect(result[0]['im:artist'].label).toContain('Another Artist');
  });
});
