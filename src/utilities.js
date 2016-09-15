// XXX:jmf This is a shorthand for that dumb dangerouslySetInnerHtml trap React uses for "security"
export const createMarkup = HTML => {
  return {__html: HTML}
}
