import React, { useState, useRef } from 'react';
import { Icon } from '@mui/material';

/**
 * StoreFlyer Component
 *
 * Props shape:
 * {
 *   store_id: string,
 *   store_name: string,
 *   store_location: string,
 *   store_branding: string,
 *   effective_from: string,       // "YYYY-MM-DD"
 *   valid_till: string,           // "YYYY-MM-DD"
 *   tag_line: string,
 *   terms: string,
 *   product: Array<{
 *     id: number,
 *     product_upc: number,
 *     product_name: string,
 *     product_price: string,
 *     discount: string,
 *     product_logo: string,
 *     other_detail: string,
 *   }>
 * }
 *
 * Layout per page (9 products):
 *   product[0] → Featured center (large)
 *   product[1] → Upper-left, row 1
 *   product[2] → Upper-left, row 2
 *   product[3] → Upper-right, row 1
 *   product[4] → Upper-right, row 2
 *   product[5] → Bottom col 1
 *   product[6] → Bottom col 2
 *   product[7] → Bottom col 3
 *   product[8] → Bottom col 4
 */
// ─── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── ProductImage ────────────────────────────────────────────────────────────────

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  const prevSrc = useRef(src);
  
  
  if (prevSrc.current !== src) {
    prevSrc.current = src;
    if (failed) setFailed(false);
  }

  const wrapStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    overflow: 'hidden',
  };

  if (!src || failed) {
    return (
      <div style={wrapStyle}>
        <span style={{ fontSize: '10px', color: '#ccc' }}>No Image</span>
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <img
        key={src}
        src={src}
        alt={alt || ''}
        onError={() => setFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

// ─── Discount Badge ──────────────────────────────────────────────────────────────

function DiscountBadge({ label, size = 52 }) {
  if (!label) return null;
  return (
    <div style={{
      position: 'absolute',
      top: '7px',
      right: '7px',
      width: size,
      height: size,
      backgroundColor: '#e53935',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: '900',
      fontSize: Math.max(8, Math.floor(size * 0.18)),
      textAlign: 'center',
      lineHeight: 1.15,
      zIndex: 3,
      boxShadow: '0 2px 6px rgba(229,57,53,0.5)',
      padding: '3px',
      boxSizing: 'border-box',
      letterSpacing: '-0.3px',
    }}>
      {label}
    </div>
  );
}

// ─── Featured Card ───────────────────────────────────────────────────────────────

function FeaturedCard({ item }) {
  // Empty featured slot → invisible
  if (!item) {
    return <div style={{ flex: 1, minWidth: 0, minHeight: 0 }} />;
  }
// #e53935
  return (
    <div style={{
      border: '3px solid #e53935',
      borderRadius: '14px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      flex: 1,
      minHeight: 0,
      boxSizing: 'border-box',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', flex: '0 0 48%', minHeight: 0, overflow: 'hidden' }}>
        <ProductImage src={item.product_logo} alt={item.product_name} />
        <DiscountBadge label={item.discount} size={66} />
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 14px 12px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ fontSize: '22px', fontWeight: '900', color: '#111', lineHeight: 1.1, marginBottom: '4px' }}>
          {item.product_name}
        </div>
        <div style={{ fontSize: '52px', fontWeight: '900', color: '#111', lineHeight: 1, letterSpacing: '-2px' }}>
          {item.product_price}
        </div>
        {item.other_detail && (
          <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', lineHeight: 1.4 }}>
            {item.other_detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Regular Card ────────────────────────────────────────────────────────────────

function RegularCard({ item, badgeSize = 42 }) {
  // Empty slot → invisible (just background shows through)
  if (!item) {
    return <div style={{ flex: 1, minWidth: 0, minHeight: 0 }} />;
  }

  return (
    <div style={{
      border: '2px solid #e53935',
      borderRadius: '12px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      flex: 1,
      minHeight: 0,
      boxSizing: 'border-box',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', flex: '0 0 45%', minHeight: 0, overflow: 'hidden' }}>
        <ProductImage src={item.product_logo} alt={item.product_name} />
        <DiscountBadge label={item.discount} size={badgeSize} />
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 8px 8px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '800', color: '#111', marginBottom: '2px', lineHeight: 1.2 }}>
          {item.product_name}
        </div>
        <div style={{ fontSize: '20px', fontWeight: '900', color: '#111', lineHeight: 1 }}>
          {item.product_price}
        </div>
        {item.other_detail && (
          <div style={{ fontSize: '8px', color: '#666', marginTop: '3px', lineHeight: 1.3 }}>
            {item.other_detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tag Badge ───────────────────────────────────────────────────────────────────

function TagBadge({ tagLine }) {
  if (!tagLine) return null;

  const words = tagLine.trim().split(' ');
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(' ');
  const line2 = words.slice(half).join(' ');

  return (
    <div style={{
      flexShrink: 0,
      width: '120px',
      height: '100px',
      borderRadius: '14px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f7971e 0%, #e74c3c 55%, #c0392b 100%)',
      boxShadow: '0 3px 12px rgba(197,48,48,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Decorative radial glows */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 10% 10%, rgba(255,200,0,0.5) 0%, transparent 28%),
          radial-gradient(circle at 90% 10%, rgba(0,180,100,0.4) 0%, transparent 26%),
          radial-gradient(circle at 10% 90%, rgba(255,150,0,0.45) 0%, transparent 26%),
          radial-gradient(circle at 90% 90%, rgba(0,80,200,0.35) 0%, transparent 26%)
        `,
      }} />
      <div style={{
        position: 'absolute', top: '6px', left: '6px', right: '6px', bottom: '6px',
        border: '2px solid rgba(255,220,80,0.55)', borderRadius: '9px',
      }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}>
        <span style={{ display: 'block', fontSize: '22px', fontWeight: '700', fontStyle: 'italic', lineHeight: 1.1 }}>
          {line1}
        </span>
        {line2 && (
          <span style={{ display: 'block', fontSize: '28px', fontWeight: '900', color: '#ffe066', lineHeight: 1.05, textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
            {line2}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Single Page ─────────────────────────────────────────────────────────────────

function FlyerPage({ store_name, store_location, store_branding, effective_from, valid_till, tag_line, terms, pageProducts, pageIndex, totalPages }) {
  const get = (i) => (pageProducts && i < pageProducts.length) ? pageProducts[i] : null;
  const [logoFailed, setLogoFailed] = useState(false);

  const validRange = (() => {
    const from = formatDate(effective_from);
    const till = formatDate(valid_till);
    if (from && till) return `Valid: ${from} – ${till}`;
    if (from) return `Valid from: ${from}`;
    if (till) return `Valid till: ${till}`;
    return '';
  })();

  return (
    <div 
    data-flyer-page="true" 
    style={{
      width: '794px',
      height: '1123px',           /* fixed A4-ish height — cards fill it fully */
      backgroundColor: '#fff',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '18px 22px 14px', gap: '16px', flexShrink: 0 }}>
        <div style={{
          width: '86px', height: '86px',
          border: '2.5px solid #111', borderRadius: '14px',
          flexShrink: 0, overflow: 'hidden', backgroundColor: '#fafafa',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {store_branding && !logoFailed ? (
            <img
              key={store_branding}
              src={store_branding}
              alt="Store Logo"
              onError={() => setLogoFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <div style={{ fontSize: '12px', fontWeight: '700', textAlign: 'center', color: '#333', lineHeight: 1.3, padding: '4px' }}>
              STORE<br />LOGO
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: 1.05, margin: 0, color: '#111', letterSpacing: '-0.5px' }}>
            {store_name}
          </h1>
          <p style={{ fontSize: '14px', color: '#555', margin: '4px 0 0', fontWeight: '400' }}>
            {store_location}
          </p>
        </div>

        <TagBadge tagLine={tag_line} />
      </div>

      {/* ── DATE BAR ── */}
      {validRange && (
        <div style={{
          backgroundColor: '#fde8d0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '9px 20px', position: 'relative', flexShrink: 0,
        }}>
          <span style={{ position: 'absolute', left: '18px', fontSize: '18px', color: '#000000' }} role="img" aria-label="calendar"><Icon>calendar_month</Icon></span>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>{validRange}</span>
        </div>
      )}

      {/* ── PRODUCTS (fills remaining height) ── */}
      <div style={{
        flex: 1,
        padding: '12px 16px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: 0,
      }}>

        {/* Upper grid: left | featured | right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '10px',
          flex: '6',               /* 60% of product area */
          minHeight: 0,
        }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0 }}>
            <RegularCard item={get(1)} badgeSize={40} />
            <RegularCard item={get(2)} badgeSize={40} />
          </div>

          {/* Featured center */}
          <FeaturedCard item={get(0)} />

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0 }}>
            <RegularCard item={get(3)} badgeSize={40} />
            <RegularCard item={get(4)} badgeSize={40} />
          </div>
        </div>

        {/* Bottom row: 4 cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          flex: '4',               /* 40% of product area */
          minHeight: 0,
        }}>
          <RegularCard item={get(5)} badgeSize={36} />
          <RegularCard item={get(6)} badgeSize={36} />
          <RegularCard item={get(7)} badgeSize={36} />
          <RegularCard item={get(8)} badgeSize={36} />
        </div>

      </div>

      {/* Page indicator */}
      {totalPages > 1 && (
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', paddingBottom: '3px', flexShrink: 0 }}>
          Page {pageIndex + 1} of {totalPages}
        </div>
      )}

      {/* ── FOOTER ── */}
      <div style={{
        backgroundColor: '#fde8d0',
        padding: '9px 20px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#444',
        flexShrink: 0,
      }}>
        {terms}
        
        <br/>{(pageIndex + 1 === totalPages) ? `Made with ❤️ by linkedin.com/in/thisisjaymodi` : ""}
        
      </div>

    </div>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────────

const StoreFlyer = (props) => {
  const {
    store_name     = '',
    store_location = '',
    store_branding = '',
    effective_from = '',
    valid_till     = '',
    tag_line       = '',
    terms          = '',
    product        = [],
  } = props;

  const PRODUCTS_PER_PAGE = 9;
  const pages = [];

  if (product.length === 0) {
    pages.push([]);
  } else {
    for (let i = 0; i < product.length; i += PRODUCTS_PER_PAGE) {
      pages.push(product.slice(i, i + PRODUCTS_PER_PAGE));
    }
  }

  const shared = { store_name, store_location, store_branding, effective_from, valid_till, tag_line, terms };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Arial, sans-serif",
      backgroundColor: '#e8e8e8',
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
    }}>
      {pages.map((pageProducts, idx) => (
        <FlyerPage
          key={idx}
          {...shared}
          pageProducts={pageProducts}
          pageIndex={idx}
          totalPages={pages.length}
        />
      ))}
    </div>
  );
};

export default StoreFlyer;

/*
─────────────────────────────────────────────────────────────────────────────────
  USAGE EXAMPLE
─────────────────────────────────────────────────────────────────────────────────

import StoreFlyer from './StoreFlyer';

const data = {
  store_id: "H1235",
  store_name: "Hardys - Store 1234",
  store_location: "1234 Dundas St. W, NYC 123456",
  store_branding: "https://example.com/store_logo.png",
  effective_from: "2026-02-16",
  valid_till: "2026-02-22",
  tag_line: "Diwali Sale",
  terms: "This flyer is subject to terms and conditions",
  product: [
    {
      id: 1,
      product_upc: 12510566,
      product_name: "Amazing Fries",
      product_price: "$3.65*",
      discount: "SAVE 20%",
      product_logo: "https://example.com/fries.png",
      other_detail: "*Taxes, cheese, add-ons extra, subject to changes on price only."
    },
    // Add more products — every 9 generates a new page automatically
  ]
};

function App() {
  return <StoreFlyer {...data} />;
}
*/