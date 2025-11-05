import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Book {
  id: string;
  title: string;
  genre: string;
  description: string;
  chapters: number;
  cover: string;
  createdAt: string;
}

const genreData = {
  fantasy: {
    name: 'Фэнтези',
    icon: 'Sparkles',
    cover: 'https://cdn.poehali.dev/projects/0b848d32-ff37-4cd5-899c-ad4e560c06c7/files/a0fc3e7c-ab8e-42e8-8c6e-824e5fe65e04.jpg',
  },
  detective: {
    name: 'Детектив',
    icon: 'Search',
    cover: 'https://cdn.poehali.dev/projects/0b848d32-ff37-4cd5-899c-ad4e560c06c7/files/0a128244-d870-46ba-b2b8-fd556ff590ce.jpg',
  },
  romance: {
    name: 'Роман',
    icon: 'Heart',
    cover: 'https://cdn.poehali.dev/projects/0b848d32-ff37-4cd5-899c-ad4e560c06c7/files/a0fc3e7c-ab8e-42e8-8c6e-824e5fe65e04.jpg',
  },
  scifi: {
    name: 'Фантастика',
    icon: 'Rocket',
    cover: 'https://cdn.poehali.dev/projects/0b848d32-ff37-4cd5-899c-ad4e560c06c7/files/a8963248-b197-403a-9cf4-d6d3819b58f9.jpg',
  },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Тайна забытого замка',
      genre: 'fantasy',
      description: 'Магическое путешествие через миры',
      chapters: 12,
      cover: genreData.fantasy.cover,
      createdAt: '2024-11-01',
    },
    {
      id: '2',
      title: 'Последнее дело инспектора',
      genre: 'detective',
      description: 'Расследование века в туманном Лондоне',
      chapters: 8,
      cover: genreData.detective.cover,
      createdAt: '2024-11-03',
    },
  ]);

  const [newBook, setNewBook] = useState({
    title: '',
    genre: '',
    description: '',
    chapters: 5,
  });

  const [isCreating, setIsCreating] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreateBook = () => {
    if (!newBook.title || !newBook.genre || !newBook.description) {
      toast.error('Заполните все поля');
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const book: Book = {
        id: Date.now().toString(),
        title: newBook.title,
        genre: newBook.genre,
        description: newBook.description,
        chapters: newBook.chapters,
        cover: genreData[newBook.genre as keyof typeof genreData].cover,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setBooks([book, ...books]);
      toast.success('Книга создана! ИИ начинает генерацию глав...');
      setIsCreating(false);
      setCreateDialogOpen(false);
      setNewBook({ title: '', genre: '', description: '', chapters: 5 });
      setActiveTab('library');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="BookOpen" size={48} className="text-primary" />
            <h1 className="text-5xl font-bold text-primary">BookAI</h1>
          </div>
          <p className="text-xl text-muted-foreground">Создавай книги с помощью искусственного интеллекта</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="home">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="create">
              <Icon name="PenTool" size={18} className="mr-2" />
              Создать
            </TabsTrigger>
            <TabsTrigger value="library">
              <Icon name="Library" size={18} className="mr-2" />
              Библиотека
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm border-2 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-3xl">Добро пожаловать в мир литературного творчества</CardTitle>
                <CardDescription className="text-lg">
                  Превратите свои идеи в полноценные книги с иллюстрациями
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                    <Icon name="Sparkles" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">ИИ генерация</h3>
                      <p className="text-sm text-muted-foreground">
                        ChatGPT создаёт увлекательные сюжеты и персонажей
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                    <Icon name="Image" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Иллюстрации</h3>
                      <p className="text-sm text-muted-foreground">
                        Автоматическая генерация картинок к каждой главе
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                    <Icon name="Users" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Совместная работа</h3>
                      <p className="text-sm text-muted-foreground">
                        Создавайте книги вместе с друзьями
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                    <Icon name="Download" size={24} className="text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Экспорт</h3>
                      <p className="text-sm text-muted-foreground">
                        Скачивайте книги в PDF и EPUB
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full text-lg">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Начать создание книги
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Создание новой книги</DialogTitle>
                      <DialogDescription>
                        Расскажите об идее вашей книги, и ИИ поможет воплотить её в жизнь
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Название книги</Label>
                        <Input
                          id="title"
                          placeholder="Например: Приключения в магическом лесу"
                          value={newBook.title}
                          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="genre">Жанр</Label>
                        <Select value={newBook.genre} onValueChange={(value) => setNewBook({ ...newBook, genre: value })}>
                          <SelectTrigger id="genre">
                            <SelectValue placeholder="Выберите жанр" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(genreData).map(([key, data]) => (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                  <Icon name={data.icon as any} size={16} />
                                  {data.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Описание сюжета</Label>
                        <Textarea
                          id="description"
                          placeholder="Опишите основную идею, героев и ключевые события..."
                          className="min-h-[120px]"
                          value={newBook.description}
                          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chapters">Количество глав: {newBook.chapters}</Label>
                        <Input
                          id="chapters"
                          type="range"
                          min="3"
                          max="20"
                          value={newBook.chapters}
                          onChange={(e) => setNewBook({ ...newBook, chapters: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setCreateDialogOpen(false)}
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleCreateBook}
                        disabled={isCreating}
                        className="flex-1"
                      >
                        {isCreating ? (
                          <>
                            <Icon name="Loader" size={18} className="mr-2 animate-spin" />
                            Создаём...
                          </>
                        ) : (
                          <>
                            <Icon name="Sparkles" size={18} className="mr-2" />
                            Создать книгу
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(genreData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => {
                    setNewBook({ ...newBook, genre: key });
                    setCreateDialogOpen(true);
                  }}
                  className="w-full"
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6 text-center space-y-3">
                      <Icon name={data.icon as any} size={32} className="mx-auto text-accent" />
                      <h3 className="font-semibold">{data.name}</h3>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Создание новой книги</CardTitle>
                <CardDescription>
                  Опишите вашу идею, и искусственный интеллект создаст для вас уникальную книгу
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title-create">Название книги</Label>
                  <Input
                    id="title-create"
                    placeholder="Введите название..."
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre-create">Жанр</Label>
                  <Select value={newBook.genre} onValueChange={(value) => setNewBook({ ...newBook, genre: value })}>
                    <SelectTrigger id="genre-create">
                      <SelectValue placeholder="Выберите жанр" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(genreData).map(([key, data]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <Icon name={data.icon as any} size={16} />
                            {data.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description-create">Описание сюжета</Label>
                  <Textarea
                    id="description-create"
                    placeholder="Расскажите о главных героях, конфликте, мире..."
                    className="min-h-[200px]"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chapters-create">Количество глав: {newBook.chapters}</Label>
                  <Input
                    id="chapters-create"
                    type="range"
                    min="3"
                    max="20"
                    value={newBook.chapters}
                    onChange={(e) => setNewBook({ ...newBook, chapters: parseInt(e.target.value) })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateBook} disabled={isCreating} className="w-full" size="lg">
                  {isCreating ? (
                    <>
                      <Icon name="Loader" size={20} className="mr-2 animate-spin" />
                      Создаём магию...
                    </>
                  ) : (
                    <>
                      <Icon name="Wand2" size={20} className="mr-2" />
                      Создать книгу с помощью ИИ
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Моя библиотека</h2>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {books.length} {books.length === 1 ? 'книга' : 'книги'}
              </Badge>
            </div>

            {books.length === 0 ? (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="py-12 text-center">
                  <Icon name="BookOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Библиотека пуста</h3>
                  <p className="text-muted-foreground mb-6">Создайте свою первую книгу с помощью ИИ</p>
                  <Button onClick={() => setActiveTab('create')}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать книгу
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, index) => (
                  <Card
                    key={book.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                        <Badge variant="outline">
                          <Icon name={genreData[book.genre as keyof typeof genreData].icon as any} size={14} className="mr-1" />
                          {genreData[book.genre as keyof typeof genreData].name}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{book.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="FileText" size={16} />
                          {book.chapters} глав
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={16} />
                          {new Date(book.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => toast.info(`Открываем книгу "${book.title}"...`)}
                      >
                        <Icon name="Eye" size={16} className="mr-2" />
                        Читать
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => toast.success(`Экспорт книги "${book.title}" начат!`)}
                      >
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}