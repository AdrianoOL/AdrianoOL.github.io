# Script para adicionar width e height nas tags img do HTML
Add-Type -AssemblyName System.Drawing

$htmlFile = "R:\Marketing\Site\index.html"
$imagesPath = "R:\Marketing\Site\images"

# Ler o conteudo do HTML preservando UTF-8
$html = Get-Content -Path $htmlFile -Raw -Encoding UTF8

# Criar um dicionario com dimensoes de todas as imagens
$imageDimensions = @{}

Write-Host "Carregando dimensoes das imagens..."
Get-ChildItem -Path "$imagesPath\*.png","$imagesPath\*.jpg","$imagesPath\*.jpeg" | ForEach-Object {
    try {
        $img = [System.Drawing.Image]::FromFile($_.FullName)
        $imageDimensions[$_.Name] = @{
            Width = $img.Width
            Height = $img.Height
        }
        $img.Dispose()
    } catch {
        Write-Host "Erro ao carregar: $($_.Name)"
    }
}

Write-Host "Total de imagens catalogadas: $($imageDimensions.Count)"
Write-Host ""
Write-Host "Processando HTML..."

$updatedCount = 0

# Regex para encontrar tags img sem width/height
$pattern = '<img\s+(?![^>]*\bwidth=)(?![^>]*\bheight=)([^>]*src="images/([^"]+)"[^>]*)>'

$html = [regex]::Replace($html, $pattern, {
    param($match)

    $fullMatch = $match.Groups[0].Value
    $attributes = $match.Groups[1].Value
    $imageName = $match.Groups[2].Value

    if ($imageDimensions.ContainsKey($imageName)) {
        $width = $imageDimensions[$imageName].Width
        $height = $imageDimensions[$imageName].Height

        # Inserir width e height apos src
        $newTag = $fullMatch -replace '(src="images/[^"]+")([^>]*>)', "`$1 width=""$width"" height=""$height""`$2"

        $script:updatedCount++
        if ($script:updatedCount -le 5) {
            Write-Host "Atualizado: $imageName - ${width}px por ${height}px"
        }

        return $newTag
    } else {
        Write-Host "Imagem nao encontrada: $imageName"
        return $fullMatch
    }
})

# Salvar o arquivo atualizado preservando UTF-8 com BOM
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($htmlFile, $html, $Utf8NoBomEncoding)

Write-Host ""
Write-Host "========================================"
Write-Host "Concluido!"
Write-Host "Total atualizado: $updatedCount imagens"
Write-Host "========================================"
