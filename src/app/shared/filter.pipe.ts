import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, properties: string[]): any[] {
    if (
      !value ||
      filterString === '' ||
      !properties ||
      properties.length === 0
    ) {
      return value;
    }

    return value.filter((item) => {
      const itemValues = properties.map((prop) =>
        this.getPropertyValue(item, prop)
      );
      const lowercaseFilter = filterString.toLowerCase();

      return itemValues.some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercaseFilter);
        }
        return false;
      });
    });
  }

  private getPropertyValue(item: any, propName: string): any {
    const props = propName.split('.');
    return props.reduce((obj, prop) => (obj && obj[prop]) || null, item);
  }
}
