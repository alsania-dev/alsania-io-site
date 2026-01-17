# 🎨 ULTIMATE BRAND KIT GENERATOR (FIXED - KEEPS AVIF)
SOURCE_IMAGE ?= logo_source.png

SIZES := 16 32 64 128 256 512 1024
FORMATS := png svg webp avif  # KEEP AVIF - it works!

PNG_FILES := $(foreach size,$(SIZES),logo_symbol_$(size)x$(size).png)
SVG_FILES := $(foreach size,$(SIZES),logo_symbol_$(size).svg)
WEBP_FILES := $(foreach size,$(SIZES),logo_symbol_$(size)x$(size).webp)
AVIF_FILES := $(foreach size,$(SIZES),logo_symbol_$(size)x$(size).avif)
BRANDKIT_FILES := $(PNG_FILES) $(SVG_FILES) $(WEBP_FILES) $(AVIF_FILES)

FAVICON_SIZES := 16 32 48 64 128 256
FAVICON_PNGS := $(foreach size,$(FAVICON_SIZES),icon-$(size).png)
FAVICON_ICO := favicon.ico

SOCIAL_FILES := social-1200x630.png social-1080x1080.png touch-icon.png

.PHONY: all brandkit favicon social clean help validate-source report check-deps

all: check-deps validate-source brandkit favicon social report

brandkit: $(BRANDKIT_FILES)

favicon: $(FAVICON_ICO) touch-icon.png

social: $(SOCIAL_FILES)

# PNG generation - FIXED: preserve transparency
logo_symbol_%.png: $(SOURCE_IMAGE)
	@size=$*; \
	echo "🎨 Generating PNG $${size}x$${size}"; \
	convert "$<" -resize "$${size}x$${size}" -quality 95 -background none "$@"

# SVG generation with Inkscape
logo_symbol_%.svg: $(SOURCE_IMAGE)
	@size=$*; \
	echo "🎨 Generating SVG $${size}x$${size}"; \
	inkscape "$<" --export-filename="$@" --export-width=$$size --export-height=$$size

# WEBP generation - FIXED: preserve transparency
logo_symbol_%.webp: $(SOURCE_IMAGE)
	@size=$*; \
	echo "🎨 Generating WEBP $${size}x$${size}"; \
	convert "$<" -resize "$${size}x$${size}" -quality 90 -background none "$@"

# AVIF generation - KEPT: it works despite warnings!
logo_symbol_%.avif: $(SOURCE_IMAGE)
	@size=$*; \
	echo "🚀 Generating AVIF $${size}x$${size}"; \
	convert "$<" -resize "$${size}x$${size}" -quality 85 -background none "$@"

# Favicon generation
$(FAVICON_ICO): $(FAVICON_PNGS)
	@echo "📱 Building favicon.ico from multiple sizes"
	convert $^ $@

# Favicon PNGs - FIXED: preserve transparency
icon-%.png: $(SOURCE_IMAGE)
	@size=$*; \
	echo "📱 Creating favicon $${size}x$${size}"; \
	convert "$<" -resize "$${size}x$${size}" -background none "$@"

# Touch icon (iOS) - FIXED: preserve transparency
touch-icon.png: $(SOURCE_IMAGE)
	@echo "📱 Generating Apple Touch Icon (180x180)"
	convert "$<" -resize "180x180" -background none "$@"

# Social media - Open Graph - FIXED: transparent background
social-1200x630.png: $(SOURCE_IMAGE)
	@echo "📸 Generating Open Graph image (1200x630)"
	convert "$<" -resize "1200x630" -background transparent -gravity center -extent 1200x630 "$@"

# Social media - Square - FIXED: preserve transparency
social-1080x1080.png: $(SOURCE_IMAGE)
	@echo "📸 Generating Square social (1080x1080)"
	convert "$<" -resize "1080x1080" -background none "$@"

validate-source:
	@if [ ! -f "$(SOURCE_IMAGE)" ]; then \
		echo "❌ Source image '$(SOURCE_IMAGE)' not found!"; \
		echo "   Available images:"; \
		ls -la *.png *.jpg *.jpeg *.webp *.avif *.svg 2>/dev/null | head -10 || echo "   (none found)"; \
		exit 1; \
	else \
		echo "✅ Source image: $(SOURCE_IMAGE)"; \
		identify "$(SOURCE_IMAGE)" | head -1; \
	fi

report:
	@echo ""; \
	echo "📊 GENERATED ASSETS REPORT:"; \
	echo "================================"; \
	total_size=0; total_files=0; \
	for file in $(BRANDKIT_FILES) $(FAVICON_PNGS) $(FAVICON_ICO) $(SOCIAL_FILES); do \
		if [ -f "$$file" ]; then \
			size=$$(stat -f%z "$$file" 2>/dev/null || stat -c%s "$$file" 2>/dev/null); \
			total_size=$$(($$total_size + $$size)); \
			total_files=$$(($$total_files + 1)); \
			printf "  %-35s %8.1fK\n" "$$file" $$(echo "$$size / 1024" | bc -l); \
		fi; \
	done; \
	echo "================================"; \
	printf "  %-35s %8.1fK (%d files)\n" "TOTAL" $$(echo "$$total_size / 1024" | bc -l) $$total_files

check-deps:
	@echo "🔧 Checking dependencies..."; \
	which convert >/dev/null 2>&1 || (echo "❌ ImageMagick not installed!" && echo "   Get it: https://imagemagick.org" && exit 1); \
	echo "✅ ImageMagick found: $$(convert --version | head -1)"

clean:
	@echo "🧹 Cleaning up generated files..."; \
	rm -f $(BRANDKIT_FILES) $(FAVICON_PNGS) $(FAVICON_ICO) $(SOCIAL_FILES); \
	echo "✅ All clean!"

help:
	@echo ""; \
	echo "🚀 ULTIMATE BRAND KIT GENERATOR"; \
	echo "================================"; \
	echo ""; \
	echo "USAGE:"; \
	echo "  make all          # Generate EVERYTHING (brand kit + favicon + social)"; \
	echo "  make brandkit     # Generate all size variants (PNG/SVG/WEBP/AVIF)"; \
	echo "  make favicon      # Generate favicon.ico + touch icons"; \
	echo "  make social       # Generate social media optimized images"; \
	echo "  make validate     # Check if source image exists"; \
	echo "  make report       # Show file sizes of generated assets"; \
	echo "  make check-deps   # Verify system dependencies"; \
	echo "  make clean        # Remove all generated files"; \
	echo ""; \
	echo "SOURCE: $(SOURCE_IMAGE)"; \
	echo "SIZES: $(SIZES)"; \
	echo "FORMATS: $(FORMATS)"; \
	echo ""; \
	echo "Pro tip: Set custom source with SOURCE_IMAGE=myfile.png make all"
