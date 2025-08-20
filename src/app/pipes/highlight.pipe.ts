import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): any {
    if (!search) return text;
    if (text.toLowerCase() === search.toLowerCase()) {
      return `<mark>${text}</mark>`;
    }
    return text;
  }
}
