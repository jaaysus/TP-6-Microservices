$services = @(
    "course-service",
    "student-service",
    "teacher-service",
    "auth-service"
)

foreach ($service in $services) {
    $servicePath = "$PWD\$service"
    if (Test-Path "$servicePath\index.js") {
        Write-Host "Starting $service..."
        Start-Process "npm" -ArgumentList "start" -WorkingDirectory $servicePath
    } else {
        Write-Host "index.js not found in $service. Skipping..."
    }
}
