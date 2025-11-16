# Supabase Quick Setup Script for PowerShell
# This script helps you set up your Supabase credentials

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "3N E-Commerce Supabase Setup" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

Write-Host "Before running this script, make sure you have:" -ForegroundColor Yellow
Write-Host "1. Created a Supabase project at https://supabase.com" -ForegroundColor Yellow
Write-Host "2. Have your Project URL and API keys ready`n" -ForegroundColor Yellow

$continue = Read-Host "Do you want to continue? (y/n)"

if ($continue -ne "y") {
    Write-Host "`nSetup cancelled." -ForegroundColor Red
    exit
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Step 1: Enter Supabase Credentials" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

Write-Host "You can find these in your Supabase Dashboard:" -ForegroundColor Gray
Write-Host "Settings > API`n" -ForegroundColor Gray

$url = Read-Host "Enter your Supabase Project URL (e.g., https://xxxxx.supabase.co)"
$anonKey = Read-Host "Enter your Supabase Anon/Public Key"

# Create .env.local file
$envContent = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey

# Optional: For server-side operations (like admin actions)
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "`n✓ Created .env.local file successfully!" -ForegroundColor Green

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Step 2: Database Setup" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to your Supabase Dashboard" -ForegroundColor White
Write-Host "2. Click on 'SQL Editor' in the left sidebar" -ForegroundColor White
Write-Host "3. Create a new query" -ForegroundColor White
Write-Host "4. Copy and paste the contents of 'supabase/schema.sql'" -ForegroundColor White
Write-Host "5. Click 'Run' to create all tables and policies" -ForegroundColor White
Write-Host "6. Create another new query" -ForegroundColor White
Write-Host "7. Copy and paste the contents of 'supabase/seed.sql'" -ForegroundColor White
Write-Host "8. Click 'Run' to populate the database with products`n" -ForegroundColor White

Write-Host "For detailed instructions, see SUPABASE_SETUP.md`n" -ForegroundColor Gray

$openBrowser = Read-Host "Would you like to open the SQL Editor now? (y/n)"

if ($openBrowser -eq "y") {
    $sqlEditorUrl = "$url/project/_/sql"
    Start-Process $sqlEditorUrl
    Write-Host "`n✓ Opening SQL Editor in your browser..." -ForegroundColor Green
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Step 3: Start Development Server" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

Write-Host "After setting up the database, run:" -ForegroundColor Yellow
Write-Host "  npm run dev`n" -ForegroundColor White

Write-Host "Your app will be available at:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000`n" -ForegroundColor White

Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host "`nHappy coding! 🚀`n" -ForegroundColor Cyan
