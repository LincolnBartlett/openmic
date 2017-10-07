# OPEN MIC SOURCE
##### The open source way to open mic.
[View a dev deployment on Heroku](https://openmicsource.herokuapp.com/)
### Concept
An application that allows users to find open mics near them.

### Features
A map with the location of open mics near the user. The user can search for mics based on multiple parameters such as location, time, day of the week, type of mic (comedy, music, mixed etc.) or rating.

User accounts will have different privilege levels depending on a user's relationship to a venue/open mic. The three tiers are from top to bottom: owner, host, performer.

#### All users can:
- Search for open mics
- Review open mics
- Review venues
- Create groups

#### Only hosts can:
- Create open mic postings

#### Only owners can:
- Modify official venue pages
- Create official venue events

---
### Current Stack
##### Backend
- node.js

Primary packages express, mongoose, passport
- mongodb

##### Frontend
- angular.js
- google maps api







