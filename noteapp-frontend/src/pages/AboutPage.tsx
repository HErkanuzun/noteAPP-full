import React from 'react';
import { BookOpen, Users, GraduationCap, Share2, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  isDark: boolean;
}

function AboutPage({ isDark }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&auto=format&fit=crop"
            alt="Students studying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        </div>

        <div className="relative container mx-auto px-4 py-24 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl">
            Öğrencilerin Başarı Yolculuğunda Yanındayız
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mb-8">
            UniNotes, öğrencilerin birbirleriyle ders notlarını ve sınav kaynaklarını paylaşarak
            birlikte büyüdüğü bir öğrenme platformudur.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <BookOpen size={20} />
            Hemen Başla
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Neden UniNotes?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
                <Share2 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kolay Paylaşım</h3>
              <p className="opacity-75">
                Notlarınızı ve sınav çözümlerinizi kolayca yükleyin, düzenleyin ve paylaşın.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Topluluk Desteği</h3>
              <p className="opacity-75">
                Diğer öğrencilerle etkileşime geçin, sorular sorun ve birlikte öğrenin.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kaliteli İçerik</h3>
              <p className="opacity-75">
                Güvenilir ve kaliteli ders materyallerine anında erişim sağlayın.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-lg opacity-75">Aktif Öğrenci</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">25,000+</div>
              <div className="text-lg opacity-75">Paylaşılan Not</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-lg opacity-75">Üniversite</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Misyonumuz</h2>
              <p className="text-lg opacity-75 mb-6">
                Öğrencilerin akademik başarılarını artırmak için ihtiyaç duydukları kaynaklara
                kolayca erişebilmelerini sağlamak ve işbirlikçi bir öğrenme ortamı oluşturmak.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-blue-600" size={24} />
                  <span>Akademik mükemmelliği teşvik etmek</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-purple-600" size={24} />
                  <span>İşbirlikçi öğrenmeyi desteklemek</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="text-red-600" size={24} />
                  <span>Öğrenci dostu bir platform sunmak</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                alt="Students collaborating"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&auto=format&fit=crop"
            alt="Study environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        </div>

        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Öğrenme Yolculuğunuza Bugün Başlayın
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Binlerce öğrencinin bir parçası olduğu topluluğumuza katılın ve akademik başarınızı
            birlikte artıralım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 
                text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <GraduationCap size={20} />
              Ücretsiz Üye Ol
            </Link>
            <Link
              to="/notes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 
                backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all 
                transform hover:scale-105"
            >
              <BookOpen size={20} />
              Notları Keşfet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;