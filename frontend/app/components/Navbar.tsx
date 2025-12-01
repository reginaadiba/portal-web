import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav style={{ padding: 20, background: '#f0f0f0', marginBottom: 20 }}>
      <Link href="/" style={{ marginRight: 15 }}>Home</Link>
      <Link href="/categories" style={{ marginRight: 15 }}>Categories</Link>
      <Link href="/categories/add" style={{ marginRight: 15 }}>Add Category</Link>
      <Link href="/postings" style={{ marginRight: 15 }}>Postings</Link>
      <Link href="/postings/add">Add Posting</Link>
    </nav>
  );
}
