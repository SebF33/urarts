#!/bin/sh
set -ex

deno task migrate
deno task build
deno task start
