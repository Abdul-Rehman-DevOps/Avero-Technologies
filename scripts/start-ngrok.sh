#!/usr/bin/env bash
set -euo pipefail
pkill -f "ngrok http 3000" 2>/dev/null || true
sleep 1
mkdir -p /tmp/ngrok-avero
nohup ngrok http 3000 --log=stdout --log-format=logfmt >/tmp/ngrok-avero/ngrok.log 2>&1 &
echo $! >/tmp/ngrok-avero/ngrok.pid
sleep 4
echo "PID=$(cat /tmp/ngrok-avero/ngrok.pid)"
pgrep -a ngrok || true
# find web API port from log
API_PORT=$(grep -oE 'addr=127.0.0.1:[0-9]+' /tmp/ngrok-avero/ngrok.log | tail -1 | cut -d: -f2 || true)
API_PORT=${API_PORT:-4040}
for port in "$API_PORT" 4040 4041; do
  url=$(curl -sf "http://127.0.0.1:${port}/api/tunnels" 2>/dev/null | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d["tunnels"][0]["public_url"])' 2>/dev/null || true)
  if [ -n "${url:-}" ]; then
    echo "PUBLIC_URL=$url"
    echo "INSPECT=http://127.0.0.1:${port}"
    echo "$url" >/tmp/ngrok-avero/public_url.txt
    exit 0
  fi
done
echo "FAILED to get public url"
tail -30 /tmp/ngrok-avero/ngrok.log
exit 1
