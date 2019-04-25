const {
    assert
} = require('chai');
describe('Sql Query Builder', () => {
    it('String should trim and remove duplicate space', () => {
        const text = trimString('narayan    sharma ')
        assert.equal('narayan sharma', text);
    })

    it('should select columns from specific table', () => {
        const sql = getSqlQuery('users', ['name', 'id']);
        assert.equal('select name, id from users', sql);
    })

    it('should select all columns from specific table if columns not mentioned.', () => {
        const sql = getSqlQuery('users');
        assert.equal('select * from users', sql);
    })

    it('should able to add single where conditions', () => {
        const sql = getSqlQuery('users', [], [{
            'email': 'abc@gmail.com'
        }]);
        assert.equal('select * from users where email=abc@gmail.com', sql);
    })

    it('should able to manage multiple where conditions', () => {
        const sql = getSqlQuery('users', [],
            [
                {
                    'email': 'abc@gmail.com',
                },
                {
                    'user_type_id': 1
                }
            ]
        );
        assert.equal('select * from users where email=abc@gmail.com and user_type_id=1', sql);
    })
})

const getSqlQuery = (table, columns = [], where = []) => {
    const selectColumns = columns.length > 0 ? columns.join(', ') : '*';
    const whereConditions = where.reduce((acc, data, index) => {
        const key = Object.keys(data)[0];
        const dynamicCondition = `${Object.keys(data)[0]}=${data[key]} `;
        const clause = index == 0 ? ` where ` : ` and `;
        return acc += clause + dynamicCondition;
    }, '');
    return trimString(`select ${selectColumns} from ${table} ${whereConditions}`);
}

const trimString = (text) => {
    return text.replace(/\s+/g, ' ').trim();
}