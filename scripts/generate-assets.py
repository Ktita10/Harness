#!/usr/bin/env python3
"""
Generate pixel-perfect neo-brutalist favicon and Open Graph assets for HARNESS STUDIO.
Colors:
  --black: #0A0A0A (10, 10, 10)
  --white: #FFFFFF (255, 255, 255)
  --orange: #FF5A00 (255, 90, 0)
"""

import os
from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

COLOR_BLACK = (10, 10, 10)
COLOR_WHITE = (255, 255, 255)
COLOR_ORANGE = (255, 90, 0)
COLOR_GRAY_100 = (237, 237, 237)
COLOR_GRAY_800 = (43, 43, 43)

def draw_monogram_h(draw, x, y, size):
    """Draw the stylized 'H' monogram at (x, y) with bounding box size x size."""
    # Left bar: x: 25% -> 40%, y: 25% -> 75%
    l_x1 = x + int(0.25 * size)
    l_x2 = x + int(0.40 * size)
    l_y1 = y + int(0.25 * size)
    l_y2 = y + int(0.75 * size)
    draw.rectangle([l_x1, l_y1, l_x2, l_y2], fill=COLOR_ORANGE)

    # Right bar: x: 60% -> 75%, y: 25% -> 75%
    r_x1 = x + int(0.60 * size)
    r_x2 = x + int(0.75 * size)
    r_y1 = y + int(0.25 * size)
    r_y2 = y + int(0.75 * size)
    draw.rectangle([r_x1, r_y1, r_x2, r_y2], fill=COLOR_ORANGE)

    # Crossbar: x: 40% -> 60%, y: 45% -> 55%
    c_x1 = l_x2
    c_x2 = r_x1
    c_y1 = y + int(0.45 * size)
    c_y2 = y + int(0.55 * size)
    draw.rectangle([c_x1, c_y1, c_x2, c_y2], fill=COLOR_ORANGE)

def generate_favicon(size, filename):
    img = Image.new("RGBA", (size, size), COLOR_BLACK)
    draw = ImageDraw.Draw(img)
    draw_monogram_h(draw, 0, 0, size)
    filepath = os.path.join(PUBLIC_DIR, filename)
    img.save(filepath, "PNG")
    print(f"Generated {filename} ({size}x{size})")

def generate_og_image():
    width, height = 1200, 630
    img = Image.new("RGBA", (width, height), COLOR_BLACK)
    draw = ImageDraw.Draw(img)

    # Outer neo-brutalist border
    margin = 32
    draw.rectangle(
        [margin, margin, width - margin, height - margin],
        outline=COLOR_WHITE,
        width=4
    )

    # Inner decorative grid lines (subtle neo-brutalism)
    draw.line([margin, 180, width - margin, 180], fill=COLOR_GRAY_800, width=2)
    draw.line([margin, 460, width - margin, 460], fill=COLOR_GRAY_800, width=2)

    # Logo Block with Hard Shadow
    logo_size = 100
    logo_x = margin + 48
    logo_y = margin + 32
    shadow_offset = 6

    # Shadow
    draw.rectangle(
        [logo_x + shadow_offset, logo_y + shadow_offset,
         logo_x + logo_size + shadow_offset, logo_y + logo_size + shadow_offset],
        fill=COLOR_BLACK
    )
    # Box
    draw.rectangle(
        [logo_x, logo_y, logo_x + logo_size, logo_y + logo_size],
        fill=COLOR_BLACK,
        outline=COLOR_WHITE,
        width=3
    )
    draw_monogram_h(draw, logo_x, logo_y, logo_size)

    # Load system or fallback fonts
    font_large = None
    font_medium = None
    font_small = None
    
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            font_large = ImageFont.truetype(p, 68)
            font_medium = ImageFont.truetype(p, 36)
            font_small = ImageFont.truetype(p, 24)
            break

    if not font_large:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Title & Branding
    title_text = "HARNESS STUDIO"
    draw.text((logo_x + logo_size + 36, logo_y + 12), title_text, fill=COLOR_WHITE, font=font_large)

    tagline = "Desarrollo Web & Software a Medida"
    draw.text((logo_x, 240), tagline, fill=COLOR_ORANGE, font=font_medium)

    sub_desc = "Webs de alto impacto, Tienda Nube, e-commerce y software para potenciar pymes."
    draw.text((logo_x, 310), sub_desc, fill=COLOR_GRAY_100, font=font_small)

    # Neo-brutalist service badges
    services = ["Landing Pages", "Tienda Nube", "Tienda Online", "Software a Medida"]
    badge_x = logo_x
    badge_y = 500

    for s in services:
        bbox = draw.textbbox((0, 0), s, font=font_small)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        pad_x, pad_y = 20, 12
        b_w = text_w + pad_x * 2
        b_h = text_h + pad_y * 2

        # Hard shadow
        draw.rectangle([badge_x + 4, badge_y + 4, badge_x + b_w + 4, badge_y + b_h + 4], fill=COLOR_BLACK)
        # Badge background & border
        draw.rectangle([badge_x, badge_y, badge_x + b_w, badge_y + b_h], fill=COLOR_WHITE, outline=COLOR_BLACK, width=2)
        # Text
        draw.text((badge_x + pad_x, badge_y + pad_y - 2), s, fill=COLOR_BLACK, font=font_small)

        badge_x += b_w + 24

    filepath = os.path.join(PUBLIC_DIR, "og-image.png")
    img.save(filepath, "PNG")
    print(f"Generated og-image.png (1200x630)")

def main():
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    generate_favicon(32, "favicon-32x32.png")
    generate_favicon(192, "favicon-192x192.png")
    generate_favicon(512, "favicon-512x512.png")
    generate_favicon(180, "apple-touch-icon.png")
    generate_og_image()

if __name__ == '__main__':
    main()
