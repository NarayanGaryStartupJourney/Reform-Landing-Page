#!/usr/bin/env node

/**
 * Build script for ProFormance Landing Page
 * Minifies CSS and JavaScript for production deployment
 */

const fs = require('fs');
const path = require('path');

// Simple minification functions
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/{\s*/g, '{') // Remove spaces after opening brace
        .replace(/;\s*/g, ';') // Remove spaces after semicolon
        .replace(/,\s*/g, ',') // Remove spaces after comma
        .replace(/:\s*/g, ':') // Remove spaces after colon
        .trim();
}

function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*/g, ';') // Remove spaces after semicolon
        .replace(/,\s*/g, ',') // Remove spaces after comma
        .replace(/{\s*/g, '{') // Remove spaces after opening brace
        .replace(/}\s*/g, '}') // Remove spaces before closing brace
        .trim();
}

function minifyHTML(html) {
    return html
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/>\s+</g, '><') // Remove spaces between tags
        .trim();
}

// Build function
function build() {
    console.log('🚀 Building ProFormance Landing Page...');
    
    try {
        // Read source files
        const html = fs.readFileSync('index.html', 'utf8');
        const css = fs.readFileSync('styles.css', 'utf8');
        const js = fs.readFileSync('script.js', 'utf8');
        
        // Create dist directory
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }
        
        // Minify files
        console.log('📦 Minifying files...');
        const minifiedCSS = minifyCSS(css);
        const minifiedJS = minifyJS(js);
        const minifiedHTML = minifyHTML(html);
        
        // Write minified files
        fs.writeFileSync('dist/styles.min.css', minifiedCSS);
        fs.writeFileSync('dist/script.min.js', minifiedJS);
        fs.writeFileSync('dist/index.html', minifiedHTML);
        
        // Copy other files
        const filesToCopy = ['package.json', 'README.md', 'netlify.toml', 'vercel.json', 'site.webmanifest', '.gitignore'];
        filesToCopy.forEach(file => {
            if (fs.existsSync(file)) {
                fs.copyFileSync(file, `dist/${file}`);
                console.log(`📋 Copied ${file}`);
            }
        });
        
        // Generate build info
        const buildInfo = {
            buildTime: new Date().toISOString(),
            version: '1.0.0',
            files: {
                'index.html': fs.statSync('dist/index.html').size,
                'styles.min.css': fs.statSync('dist/styles.min.css').size,
                'script.min.js': fs.statSync('dist/script.min.js').size
            }
        };
        
        fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
        
        console.log('✅ Build completed successfully!');
        console.log('📊 Build stats:');
        console.log(`   HTML: ${buildInfo.files['index.html']} bytes`);
        console.log(`   CSS: ${buildInfo.files['styles.min.css']} bytes`);
        console.log(`   JS: ${buildInfo.files['script.min.js']} bytes`);
        console.log(`   Total: ${Object.values(buildInfo.files).reduce((a, b) => a + b, 0)} bytes`);
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build, minifyCSS, minifyJS, minifyHTML };
