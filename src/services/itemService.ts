export class ItemService {
    constructor(private itemModel: any) {}

    async createItem(data: any) {
        const newItem = await this.itemModel.create(data);
        return newItem;
    }

    async findAllItems() {
        const items = await this.itemModel.findAll();
        return items;
    }

    async findItemById(id: number) {
        const item = await this.itemModel.findByPk(id);
        if (!item) {
            throw new Error('Item not found');
        }
        return item;
    }

    async updateItem(id: number, data: any) {
        const item = await this.findItemById(id);
        const updatedItem = await item.update(data);
        return updatedItem;
    }

    async deleteItem(id: number) {
        const item = await this.findItemById(id);
        await item.destroy();
        return { message: 'Item deleted successfully' };
    }
}