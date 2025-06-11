const delimiters = [
  "(", ")",
  "{", "}",
  "[", "]",
  ",", ":", "\""
]

export function minifyFunQL(text: string) {
  let newValue = ""

  let parsingString = false
  let skipWhitespaces = true
  let skippedText = ""
  let prevChar = ""
  for (const char of text) {
    // Check whether we're inside a string, which should not skip whitespaces
    if (char === '"' && prevChar != '\\') {
      parsingString = !parsingString
    }

    const charIsWhitespace = /\s/.test(char)
    const charIsDelimiter = delimiters.includes(char)

    // Append any skipped text if character is not a delimiter or whitespace; e.g. '1 2' should not minify to '12' as
    // that's not the same value, but '1 )' can minify to '1)' as the value is still '1'
    if (!charIsWhitespace && !charIsDelimiter && !skipWhitespaces) {
      newValue = newValue.concat(skippedText)
    }

    const charIsSkippable = !parsingString && charIsWhitespace
    // Store skipped text in case we need to append it again
    skippedText = charIsSkippable ? skippedText.concat(char) : ""
    // Append char if not skipped
    newValue = !charIsSkippable ? newValue.concat(char) : newValue

    // Continue skipping if charIsWhitespace
    skipWhitespaces = skipWhitespaces && charIsWhitespace
    // Skip if currently skipping or charIsDelimiter
    skipWhitespaces = !parsingString && (skipWhitespaces || charIsDelimiter)

    prevChar = char
  }

  return newValue
}