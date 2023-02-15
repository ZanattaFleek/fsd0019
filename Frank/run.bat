@echo off
cls

cd C:\aulas\fsd0019\ProjetoBaseReact

start cmd /k npm run start

start cmd /k json-server src\mock\db.json --p 3002 --id idEscola
