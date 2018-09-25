#!/bin/bash
commitMark=`date +"%H时%M分%S秒%A"`
git add .
git commit -m $commitMark
git push