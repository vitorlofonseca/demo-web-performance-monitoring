export const post = async (endpoint: string, body: any) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return response
}
