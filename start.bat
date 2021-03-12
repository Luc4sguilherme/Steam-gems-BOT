@echo off
:loop
title *** Gems Bot ***
color 07
echo 1: node
node --max-old-space-size=4096 src/index.js 
GOTO loop