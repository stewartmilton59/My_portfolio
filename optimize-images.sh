#!/bin/bash
# Install required tools: 
# brew install webp imagemagick (Mac)
# sudo apt-get install webp imagemagick (Linux)

# Optimize main banner images
cwebp -q 80 -resize 388 582 images/stewartbanner.WebP -o images/stewartbanner-388w.WebP
cwebp -q 80 -resize 776 1164 images/stewartbanner.WebP -o images/stewartbanner-776w.WebP

# Optimize about images
cwebp -q 80 -resize 388 582 images/stewartabout.WebP -o images/stewartabout-388w.WebP
cwebp -q 80 -resize 776 1164 images/stewartabout.WebP -o images/stewartabout-776w.WebP

# Optimize project images
cwebp -q 85 -resize 388 304 images/project-img-1.WebP -o images/project-img-1-388w.WebP
cwebp -q 85 -resize 776 608 images/project-img-1.WebP -o images/project-img-1-776w.WebP

echo "Images optimized!"
