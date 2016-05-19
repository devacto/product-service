#!/bin/bash
./node_modules/.bin/forever --minUptime 5000 --spinSleepTime 1000 -w -o ./log/out.log -e ./log/err.log index.js
