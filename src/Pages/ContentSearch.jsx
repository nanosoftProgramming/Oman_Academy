import React, { useState } from 'react';

export default function ContentSearch() {
  // الحالة لتخزين قائمة المحتوى
  const [items, setItems] = useState([
    'مفهوم الأمان الرقمي وحماية البيانات',
    'آداب وأخلاقيات التواصل الرقمي المهني',
    'الحقوق والمسؤوليات الرقمية لمنتسبي الشرطة',
    'مبادئ الوصول الرقمي العادل والشامل',
    'قواعد السلوك الرقمي والأخلاقيات'
  ]);

  // الحالة لتخزين النص المدخل لإضافة عنصر جديد
  const [newText, setNewText] = useState('');
  
  // الحالة لتخزين نص البحث
  const [searchTerm, setSearchTerm] = useState('');

  // دالة لإضافة عنصر جديد للقائمة
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newText.trim() === '') return;
    setItems([...items, newText]);
    setNewText('');
  };

  // تصفية/فلترة العناصر بناءً على نص البحث
  const filteredItems = items.filter(item => 
    item.includes(searchTerm)
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>إدارة المحتوى والبحث</h2>

      {/* نموذج لإضافة محتوى جديد */}
      <form onSubmit={handleAddItem} style={styles.form}>
        <input 
          type="text" 
          value={newText} 
          onChange={(e) => setNewText(e.target.value)} 
          placeholder="أدخل محتوى جديد هنا..." 
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>إضافة</button>
      </form>

      {/* حقل البحث في المحتوى */}
      <div style={styles.searchBox}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="بحث داخل المحتوى..." 
          style={styles.input}
        />
      </div>

      {/* عرض النتائج */}
      <div style={styles.resultsArea}>
        <h3>قائمة المحتوى:</h3>
        {filteredItems.length === 0 ? (
          <p style={styles.noResult}>لا توجد نتائج مطابقة</p>
        ) : (
          <ul style={styles.list}>
            {filteredItems.map((item, index) => (
              <li key={index} style={styles.listItem}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// تنسيقات CSS مدمجة (Inline Styles)
const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '25px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Cairo, sans-serif',
    direction: 'rtl'
  },
  title: {
    textAlign: 'center',
    color: '#002366',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px'
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none'
  },
  addButton: {
    backgroundColor: '#002366',
    color: '#D4AF37',
    border: 'none',
    padding: '0 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  },
  searchBox: {
    marginBottom: '25px'
  },
  resultsArea: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '15px'
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '10px'
  },
  listItem: {
    padding: '12px',
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid #e5e7eb',
    borderRadius: '6px',
    marginBottom: '8px'
  },
  noResult: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '15px'
  }
};