import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For now, we'll just show a success message
      // In a real app, you'd send this to your backend
      console.log('Form submitted:', formData);
      
      toast.success('Thank you for your message! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-deep-mauve mb-2">
            Name <span className="text-dusty-rose">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-blush-pink focus:border-dusty-rose focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-deep-mauve mb-2">
            Email <span className="text-dusty-rose">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-blush-pink focus:border-dusty-rose focus:outline-none transition-colors"
            required
          />
        </div>
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-deep-mauve mb-2">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+63 9XX XXX XXXX"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-blush-pink focus:border-dusty-rose focus:outline-none transition-colors"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-deep-mauve mb-2">
          Message <span className="text-dusty-rose">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your order or inquiry..."
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-blush-pink focus:border-dusty-rose focus:outline-none transition-colors resize-none"
          rows={5}
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-dusty-rose hover:bg-deep-mauve text-warm-cream py-3 rounded-lg font-semibold transition-all duration-200 text-base"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
