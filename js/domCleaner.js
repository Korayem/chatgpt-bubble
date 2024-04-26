/**
 * Cleans up the current page's HTML by removing non-content tags like style, meta, and script.
 * The cleaned HTML is then ready to be converted to Markdown.
 * @param {string} html - The HTML content of the current page.
 * @returns {string} The cleaned HTML content.
 */
function cleanDOM(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove script tags
  const scripts = doc.querySelectorAll('script');
  scripts.forEach(script => script.remove());

  // Remove style tags
  const styles = doc.querySelectorAll('style');
  styles.forEach(style => style.remove());

  // Remove meta tags
  const metas = doc.querySelectorAll('meta');
  metas.forEach(meta => meta.remove());

  // Remove link tags (stylesheets, favicons, etc.)
  const links = doc.querySelectorAll('link');
  links.forEach(link => link.remove());

  // Remove comments
  const comments = doc.createNodeIterator(doc, NodeFilter.SHOW_COMMENT);
  let comment;
  while (comment = comments.nextNode()) {
    comment.remove();
  }

  // Return the cleaned HTML as a string
  return doc.body.innerHTML;
}