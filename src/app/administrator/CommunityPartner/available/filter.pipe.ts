import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    console.log(items)
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    console.log(searchText)
    return items.filter( it => {
          return it.Name.toLowerCase().includes(searchText) || it.ContactPerson.toLowerCase().includes(searchText) || it.PhysicalAddress.toLowerCase().includes(searchText);
          console
        });
   }

}
