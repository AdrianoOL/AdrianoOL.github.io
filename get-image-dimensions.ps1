# Script para obter dimensões de imagens
Add-Type -AssemblyName System.Drawing

$imagesPath = "R:\Marketing\Site\images"
$images = Get-ChildItem -Path "$imagesPath\*.png"

Write-Output "| Nome da Imagem | Largura (px) | Altura (px) |"
Write-Output "|----------------|--------------|-------------|"

foreach ($file in $images | Sort-Object Name) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        Write-Output "| $($file.Name) | $($img.Width) | $($img.Height) |"
        $img.Dispose()
    } catch {
        Write-Output "| $($file.Name) | ERRO | ERRO |"
    }
}

# Também processar JPG se houver
$jpgImages = Get-ChildItem -Path "$imagesPath\*.jpg"
foreach ($file in $jpgImages | Sort-Object Name) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        Write-Output "| $($file.Name) | $($img.Width) | $($img.Height) |"
        $img.Dispose()
    } catch {
        Write-Output "| $($file.Name) | ERRO | ERRO |"
    }
}
