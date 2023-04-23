// covertStringToBase64 is a helper function to convert a string to base64
// handles emojis as well, and uses web APIs
export function convertStringToBase64(str: string): string {
  // Convert the input string to a UTF-8 encoded byte array
  const utf8Bytes = new TextEncoder().encode(str)

  // Encode the UTF-8 byte array as a base64 string
  return  window.btoa(String.fromCharCode(...utf8Bytes))
}

// convertBase64ToString is a helper function to convert a base64 string to a string
// handles emojis as well, and uses web APIs
export function convertBase64ToString(base64: string): string {
  // Decode the base64 string into a byte array
  const bytes = new Uint8Array(window.atob(base64).split("").map((char) => char.charCodeAt(0)))

  // Convert the byte array to a UTF-8 encoded string
  return new TextDecoder().decode(bytes)
}
