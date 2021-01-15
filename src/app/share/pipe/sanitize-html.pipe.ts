import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';
@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {

  }
  transform(v: string): SafeHtml {
    const sanitizedContent = DOMPurify.sanitize(v);
     return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);

  }

}
