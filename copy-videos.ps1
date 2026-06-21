$ErrorActionPreference = 'SilentlyContinue'
New-Item -ItemType Directory -Force -Path 'e:\界面设计作品集\public\videos' | Out-Null
$src = 'e:\界面设计作品集\src\assets'
$dest = 'e:\界面设计作品集\public\videos'
for ($i = 1; $i -le 9; $i++) {
    $name = "动效$i.mp4"
    Copy-Item "$src\$name" -Destination "$dest\$name" -Force
}
Write-Host "Done"
