import logsJson from '@/data/logs.json'

export async function GET() {
  return new Response(JSON.stringify(logsJson), {
    headers: {
      'content-type': 'application/json'
    }
  })
}
