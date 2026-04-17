#!/bin/sh
set -ex

deno task migrate
#deno task cache
deno task build
deno task start
